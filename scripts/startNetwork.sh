#!/bin/bash

# delete the card
echo 'Deleting Card! . . .';
composer card delete -c admin@bronco-cloud
echo -e 'Card has been deleted!\n'

# install the network 
echo 'Installing the network! . . .';
composer network install -c PeerAdmin@hlfv1 -a ../dist/bronco-cloud@1.1.1.bna
echo -e 'Network has been installed!\n'

# start the network
echo 'Starting the network! . . .';
composer network start -c PeerAdmin@hlfv1 -n bronco-cloud -V 1.1.1 -A admin -S adminpw
echo -e 'Network has been started!\n'

# import the network card
composer card import -f admin@bronco-cloud.card

# move the card to the ../dist folder
mv admin@bronco-cloud.card ../dist

# run the REST server
./rs-multi-user.sh
