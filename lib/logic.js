/**
 * Write your transction processor functions here
 */

/**
* Create Item transaction
* @param {org.cpp.csdept.assets.Create_Asset} assetValues
* @transaction
*/
async function CreateAsset(assetValues) {
	// 1. Get asset registry
	const assetRegistry = await getAssetRegistry('org.cpp.csdept.assets.Department_Asset');

	// 2. Get the resource factory
	const factory = getFactory();
	const assetNamespace = 'org.cpp.csdept.assets';

	// 3. Create the resource
	const asset_Id = generateAssetID(assetValues.asset_name);
	var asset = factory.newResource(assetNamespace, 'Department_Asset', asset_Id);

	// 4. Set the values
	asset.asset_name = assetValues.asset_name;

	// 5. Add the asset to the registry
	return assetRegistry.addAll([asset]);
}

/**
 * Checkout Item transaction
 * @param {org.cpp.csdept.assets.Checkout_Item} rentalAssetValue
 * @transaction
 */
async function CheckoutAsset(rentalAssetValue) {
	var updated_assets = [];

	// 1. Get asset registry
	const rentalRegistry = await getAssetRegistry('org.cpp.csdept.assets.Rental');
	const assetRegistry = await getAssetRegistry('org.cpp.csdept.assets.Department_Asset');

	// 2. Get the resource factory
	var factory = getFactory();
	var assetNamespace = 'org.cpp.csdept.assets';

	// 3. Create the Resource instance
	var checkoutID = generateRentalID(rentalAssetValue.renter.cpp_email);

	// Checkout instance
	var checkout = factory.newResource(assetNamespace, 'Rental', checkoutID);

	var current_time_hours = (new Date().getHours() - 12);
	var current_time_minutes = (new Date().getMinutes());
	
	// pad minutes with leading zeros if they are only a single digit
	current_time_minutes = (current_time_minutes < 10) ? ('0' + current_time_minutes) : current_time_minutes;
	
	// check if current time is negative (checkout happend before 12 noon)
	// if so, just return original time
	if(current_time_hours <= 0) {
		current_time_hours = new Date().getHours();
	}

	var return_time_hours = current_time_hours + 3;

	// check if return time is greater than 12 (checkout at either 10, 11, or 12)
	// if so, return time = return time - 12
	if(return_time_hours > 12) {
		return_time_hours = return_time_hours - 12;
	}

	// 4. Set the relationship
	checkout.checkout_ID = checkoutID;
	checkout.checkout_time = current_time_hours.toString() + ':' + current_time_minutes.toString(); 
	checkout.due_by = return_time_hours.toString() + ':' + current_time_minutes.toString();
	checkout.renter = rentalAssetValue.renter.name;
	checkout.department_assets = rentalAssetValue.department_assets;

	// 6. Emit the event Checkout_Item
	var event = factory.newEvent(assetNamespace, 'Item_Checked_Out');
	event.checkout_ID = checkoutID;
	emit(event);

	for (asset of checkout.department_assets) {
		var new_asset = await assetRegistry.get(asset.asset_Id);
		new_asset.in_use = true;
		new_asset.renter = rentalAssetValue.renter.name;
		await assetRegistry.update(new_asset);
	};

	// 6. Add the Checkout
	await rentalRegistry.addAll([checkout]);
}

/**
 * Checked In Item transaction
 * @param {org.cpp.csdept.assets.Return_Item} rentalAssetValue
 * @transaction
 */
async function CheckinAsset(rentalAssetValue) {
	// 1. Create the resource factory and namespace
	var factory = getFactory();
	var assetNamespace = 'org.cpp.csdept.assets';

	// #1 - Delete rental in registry
	// 2. Get asset registry
	const rentalRegistry = await getAssetRegistry('org.cpp.csdept.assets.Rental');

	// 4. delete the rental asset in registry
	await rentalRegistry.remove(rentalAssetValue.renter.name);

	// 5. Emit the Return_Item event
	const checkinID = generateRentalID(rentalAssetValue.renter.name);
	var event = factory.newEvent(assetNamespace, 'Item_Returned');
	event.checkin_ID = checkinID;
	emit(event);


	// # 2 - Update the asset in the assets registry
	// need the asset registry
	const assetRegistry = await getAssetRegistry('org.cpp.csdept.assets.Department_Asset');

	// Loop through each asset
	for (asset of rentalAssetValue.department_assets) {
		// 6. get the assets in the assets registry
		var updated_asset = await assetRegistry.get(asset.asset_Id);

		// 7. Reset the flags of the asset
		updated_asset.in_use = false;
		updated_asset.renter = null;
		await assetRegistry.update(updated_asset);
	}

}

function generateRentalID(user_name) {
	var full_tag = user_name;
	return full_tag;
}

function generateAssetID(asset_name) {
	var random_1 = (Math.floor(Math.random() * 9) + 1).toString();
	var random_2 = (Math.floor(Math.random() * 9) + 1).toString();
	var random_3 = (Math.floor(Math.random() * 9) + 1).toString();
	var full_tag = asset_name + random_1 + random_2 + random_3;

	return full_tag;
}

/**
 * Add_Money transaction
 * @param {org.cpp.csdept.user.Add_Money} addAmount
 * @transaction
 */
function Add_Money(addAmount) {
	// 1. Get asset registry
	return getParticipantRegistry('org.cpp.csdept.user.Student')
		.then(function (userRegistry) {

			var factory = getFactory();
			// get specific user
			const user = userRegistry.get(addAmount.cpp_email);

			// Update user balance
			user.balance = user.balance + addAmount.amount;
			userRegistry.update(user);

			var userNamespace = 'org.cpp.csdept.user';
			// Emit 'Money Added' event
			var event = factory.newEvent(userNamespace, 'Money_Added');
			emit(event);
		});
}