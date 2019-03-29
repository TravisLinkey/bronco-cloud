/**
 * Write your transction processor functions here
 */

/**
* Create Item transaction
* @param {org.cpp.csdept.assets.Create_Asset} assetValues
* @transaction
*/
async function CreateAsset (assetValues) {
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
async function CheckoutAsset (rentalAssetValue) {
	// 1. Get asset registry
	const rentalRegistry = await getAssetRegistry('org.cpp.csdept.assets.Rental');
	const assetRegistry = await getAssetRegistry('org.cpp.csdept.assets.Department_Asset'); 
  
	// 2. Get the resource factory
	var factory = getFactory();
	var assetNamespace = 'org.cpp.csdept.assets';

	// 3. Create the Resource instance
	var checkoutID = generateRentalID(rentalAssetValue.renter.name);

	// Checkout instance
	var checkout = factory.newResource(assetNamespace, 'Rental', checkoutID);
  	var department_asset = await assetRegistry.get(rentalAssetValue.department_asset.asset_Id);
	var current_time = new Date();

	// 4. Set the relationship
	checkout.checkout_ID = checkoutID;
	checkout.due_by = current_time.getHours() + 3;
    checkout.renter = rentalAssetValue.renter;
    checkout.department_asset = rentalAssetValue.department_asset;
  
  	// 5. update the assets renter
  	department_asset.renter = rentalAssetValue.renter;
  	department_asset.in_use = true;

	// 6. Emit the event Checkout_Item
	var event = factory.newEvent(assetNamespace, 'Item_Checked_Out');
	event.checkout_ID = checkoutID;
	emit(event);
      
	// 5. update the department asset renter assignment to renter
	await assetRegistry.updateAll([department_asset]);
  
	// 6. Add the Checkout
	await rentalRegistry.addAll([checkout]);
}

/**
 * Checked In Item transaction
 * @param {org.cpp.csdept.assets.Return_Item} rentalAssetValue
 * @transaction
 */
async function CheckinAsset (rentalAssetValue) {
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
  // 6. get the asset in the assets registry
  const assetRegistry = await getAssetRegistry('org.cpp.csdept.assets.Department_Asset');
  const updated_asset = await assetRegistry.get(rentalAssetValue.department_asset.asset_Id);
  
  // 7. Reset the flags of the asset
  updated_asset.in_use = false;
  updated_asset.renter = null;

   // 8. update the asset registry
  return assetRegistry.updateAll([updated_asset]);
}

function generateRentalID(user_name) {
    var full_tag = user_name;
    return full_tag;
}

function generateAssetID(asset_name) {
    var current_time = new Date();
    var full_tag = asset_name + ':' + current_time.getFullYear() + '-' + current_time.getMonth()
    + '-' + current_time.getDate() + '::' + current_time.getHours() + '::' + current_time.getMinutes();

    return full_tag;
}

/**
 * Add_Money transaction
 * @param {org.cpp.csdept.user.Add_Money} addAmount
 * @transaction
 */
function Add_Money (addAmount) {
    // 1. Get asset registry
    return getParticipantRegistry('org.cpp.csdept.user.Student')
        .then(function(userRegistry) {

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