import React, {Component} from 'react';

import {
    Alert,
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
    Image,
    Linking,
    ToastAndroid
} from 'react-native';

const CleverTap = require('clevertap-react-native');

class Expandable_ListView extends Component {

    constructor() {

        super();

        this.state = {

            layout_Height: 0

        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.item.expanded) {
            this.setState(() => {
                return {
                    layout_Height: null
                }
            });
        } else {
            this.setState(() => {
                return {
                    layout_Height: 0
                }
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.layout_Height !== nextState.layout_Height) {
            return true;
        }
        return false;
    }


//In this Function You can write the items to be called w.r.t list id:
    show_Selected_Category = (item) => {
        switch (item) {
            case 1:
                userProfile();
                break;
            case 2:
                CleverTap.profileSetMultiValuesForKey(['a', 'b', 'c'], 'letters');
                break;
            case 3:
                CleverTap.profileRemoveMultiValueForKey('b', 'letters');
                break;
            case 4: //Removing a Value from the Multiple Values
                CleverTap.profileRemoveMultiValueForKey('b', 'letters');
                break;
            case 5:
                CleverTap.profileAddMultiValueForKey('d', 'letters');
                break;
            case 6:
                id_mngmt();
                break;
            case 7://Removing a Value from the Multiple Values
                rmvalskey();
                break;
            case 8:
                rmvalkey();
                break;
            case 9:
                getCTid();
                break;
            case 10:
                userLocation();
                break;
            case 11:
                CleverTap.initializeInbox();
                break;
            case 12:
                appInbox();
                break;
            case 13:
                getTotmsg();
                break;
            case 14:
                unread();
                break;
            case 15:
                allmsg();
                break;
            case 16:
                allunreadmsg();
                break;
            case 17:
                inboxid();
                break;
            case 18:
                deleteMsg();
                break;
            case 19:
                markread();
                break;
            case 20:
                pnviewed();
                break;
            case 21:
                pnclicked();
                break;
            case 22:
                pushevent();
                break;
            case 23:
                pushchargedevent();
                break;
            case 24:
                CleverTap.setDebugLevel(3);
                break;
            case 25:
                create_NCGroup();
                break;
            case 26:
                create_NC();
                break;
            case 27:
                delete_NC();
                break;
            case 28:
                delete_NCGroup();
                break;
            case 29:
                pushFcmRegistrationId();
                break;
            case 30:
                create_notification();
                break;
            case 300:
                createNotificationChannelWithSound();
                break;
            case 31:
                getUnitID();
                break;
            case 32:
                getAllDisplayUnits();
                break;
            case 33    :
                fetch();
                break;
            case 34    :
                activate();
                break;
            case 35    :
                fetchAndActivate();
                break;
            case 36    :
                fetchwithMinIntervalinsec();
                break;
            case 37    :
                setMinimumFetchIntervalInSeconds();
                break;
            case 38    :
                getBoolean();
                break;
            case 39    :
                getDouble();
                break;
            case 40    :
                getLong();
                break;
            case 41    :
                getString();
                break;
            case 42    :
                getStrings();
                break;
            case 43    :
                reset_config();
                break;
            case 44    :
                getLastFetchTimeStampInMillis();
                break;
            case 45    :
                getFeatureFlag();
                break;
            case 46    :
                enablePersonalization();
                break;
            case 47    :
                profile_getProperty();
                break;
            case 48    :
                attri();
                break;
            case 49    :
                CleverTap.setOptOut(value);
                break;
            case 50    :
                CleverTap.enableDeviceNetworkInfoReporting(value);
                break;
            case 51    :
                CleverTap.enablePersonalization();
                break;
            case 52    :
                CleverTap.setOffline(value);
                break;
            case 53:
                addCleverTapAPIListeners(true);
                break;
            case 54:
                removeCleverTapAPIListeners();
                break;
        }
    }

    render() {
        return (
            <View style={styles.Panel_Holder}>

                <TouchableOpacity activeOpacity={0.8} onPress={this.props.onClickFunction} style={styles.category_View}>

                    <Text style={styles.category_Text}>{this.props.item.category_Name} </Text>

                    <Image
                        source={{uri: 'https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png'}}
                        style={styles.iconStyle}/>

                </TouchableOpacity>

                <View style={{height: this.state.layout_Height, overflow: 'hidden'}}>

                    {
                        this.props.item.sub_Category.map((item, key) => (

                            <TouchableOpacity key={key} style={styles.sub_Category_Text}
                                              onPress={this.show_Selected_Category.bind(this, item.id)}>

                                <Text> {item.name} </Text>

                                <View style={{width: '100%', height: 1, backgroundColor: '#000'}}/>

                            </TouchableOpacity>

                        ))
                    }

                </View>

            </View>

        );
    }
}

export default class App extends Component {

    constructor() {
        super();

        if (Platform.OS === 'android') {

            UIManager.setLayoutAnimationEnabledExperimental(true)

        }

        CleverTap.setDebugLevel(3);
        addCleverTapAPIListeners(false);
        CleverTap.initializeInbox();

        // Listener to handle incoming deep links
        Linking.addEventListener('url', _handleOpenUrl);

        // this handles the case where a deep link launches the application
        Linking.getInitialURL().then((url) => {
            if (url) {
                console.log('launch url', url);
                _handleOpenUrl({url});
            }
        }).catch(err => console.error('launch url error', err));

        // check to see if CleverTap has a launch deep link
        // handles the case where the app is launched from a push notification containing a deep link
        CleverTap.getInitialUrl((err, url) => {
            if (url) {
                console.log('CleverTap launch url', url);
                _handleOpenUrl({url}, 'CleverTap');
            } else if (err) {
                console.log('CleverTap launch url', err);
            }
        });


        const array = [

            {
                expanded: false,
                category_Name: "User Properties",
                sub_Category: [{id: 1, name: 'pushProfile'}, {id: 2, name: 'set Multi Values For Key'}, {
                    id: 3,
                    name: 'removeMultiValueForKey'
                },
                    {id: 4, name: 'removeValueForKey'}, {id: 5, name: 'addMultiValueForKey'}]
            },

            {
                expanded: false,
                category_Name: "Identity Management",
                sub_Category: [{id: 6, name: 'onUserLogin'}, {id: 7, name: 'removeMultiValueForKey'}, {
                    id: 8,
                    name: 'removeValueForKey'
                },
                    {id: 9, name: 'getCleverTapID'}]
            },

            {
                expanded: false, category_Name: "Location ", sub_Category: [{id: 10, name: 'setLocation'}]
            },

            {
                expanded: false, category_Name: "App Inbox", sub_Category: [{id: 11, name: 'initializeInbox'},
                    {id: 12, name: 'showAppInbox'}, {id: 13, name: 'getInboxMessageCount'}, {
                        id: 14,
                        name: 'getInboxMessageUnreadCount'
                    }, {id: 15, name: 'getAllInboxMessages'},
                    {id: 16, name: 'getUnreadInboxMessages'}, {id: 16, name: 'getInboxMessageForId'}, {
                        id: 18,
                        name: 'deleteInboxMessage'
                    }, {id: 19, name: 'markReadInboxMessage'},
                    {id: 20, name: 'pushInboxNotificationViewedEvent'}, {
                        id: 21,
                        name: 'pushInboxNotificationClickedEvent'
                    }]
            },

            {
                expanded: false,
                category_Name: "Events",
                sub_Category: [{id: 22, name: 'pushEvent'}, {id: 23, name: 'pushChargedEvent'}]
            },

            {
                expanded: false, category_Name: "Enable Debugging", sub_Category: [{id: 24, name: 'Set Debug Level'}]

            },
            {
                expanded: false,
                category_Name: "Push Notifications",
                sub_Category: [{id: 25, name: 'createNotificationChannelGroup'},
                    {id: 26, name: 'createNotificationChannel'}, {id: 27, name: 'deleteNotificationChannel'}, {
                        id: 28,
                        name: 'deleteNotificationChannelGroup'
                    },
                    {id: 29, name: 'pushFcmRegistrationId'}, {id: 30, name: 'createNotification'},{id:300,name:'createNotificationChannelWithSound'}]
            },
            {
                expanded: false,
                category_Name: "Native Display",
                sub_Category: [{id: 31, name: 'getUnitID'}, {id: 32, name: 'getAllDisplayUnits'},]
            },
            {
                expanded: false,
                category_Name: "Product Config",
                sub_Category: [{id: 33, name: 'productConfig setDefault'}, {id: 34, name: 'fetch()'},
                    {id: 35, name: 'activate'}, {id: 36, name: 'fetchAndActivate'}, {
                        id: 37,
                        name: 'setMinimumFetchIntervalInSeconds'
                    },
                    {id: 38, name: 'getBoolean'}, {id: 39, name: 'getDouble'}, {id: 40, name: 'getLong'}, {
                        id: 41,
                        name: 'getString'
                    },
                    {id: 42, name: 'getString'}, {id: 43, name: 'reset'}, , {
                        id: 44,
                        name: 'getLastFetchTimeStampInMillis'
                    }]
            },
            {
                expanded: false, category_Name: "Feature Flag", sub_Category: [{id: 45, name: 'getFeatureFlag'}]
            },
            {
                expanded: false,
                category_Name: "App Personalisation",
                sub_Category: [{id: 46, name: 'enablePersonalization'}, {id: 47, name: 'get profile Property'}]
            },
            {
                expanded: false,
                category_Name: "Attributions",
                sub_Category: [{id: 48, name: 'get CleverTap Attribution Identifier'}]
            },
            {
                expanded: false,
                category_Name: "GDPR",
                sub_Category: [{id: 49, name: 'setOptOut'}, {id: 50, name: 'enableDeviceNetworkInfoReporting'}]
            },
            {
                expanded: false,
                category_Name: "Multi-Instance",
                sub_Category: [{id: 51, name: 'enablePersonalization'}, {id: 52, name: 'setOffline'}]
            },
            {
                expanded: false,
                category_Name: "Listeners",
                sub_Category: [{id: 53, name: 'addCleverTapAPIListeners'}, {
                    id: 54,
                    name: 'removeCleverTapAPIListeners'
                }]
            }

        ];

        this.state = {AccordionData: [...array]}
    }

    update_Layout = (index) => {

        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        const array = [...this.state.AccordionData];

        array[index]['expanded'] = !array[index]['expanded'];

        this.setState(() => {
            return {
                AccordionData: array
            }
        });
    }

    render() {
        return (
            <View style={styles.MainContainer}>

                <ScrollView contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 5}}>
                    {
                        this.state.AccordionData.map((item, key) =>
                            (
                                <Expandable_ListView key={item.category_Name}
                                                     onClickFunction={this.update_Layout.bind(this, key)} item={item}/>
                            ))
                    }
                </ScrollView>

            </View>
        );
    }
}

userProfile = () => {

    alert('User Profile Updated');

    CleverTap.profileSet({
        'Name': 'testUserA1', 'Identity': '123456', 'Email': 'test@test.com', 'custom1': 123,
        'birthdate': new Date('2020-03-03T06:35:31')
    });

};
//Identity_Management
id_mngmt = () => {
    alert('User Profile Updated');

    //On user Login
    CleverTap.onUserLogin({
        'Name': 'testUserA1', 'Identity': new Date().getTime() + '',
        'Email': new Date().getTime() + 'testmobile@test.com', 'custom1': 123,
        'birthdate': new Date('1992-12-22T06:35:31')
    })

};
rmvalskey = () => {
    alert('User Profile Updated');

    //Removing Multiple Values
    CleverTap.profileRemoveMultiValuesForKey(['a', 'c'], 'letters');

};
rmvalkey = () => {
    alert('User Profile Updated');

    //Removing Value for key
    CleverTap.profileRemoveValueForKey("letters");

};
getCTid = () => {

    CleverTap.profileGetCleverTapID((err, res) => {
        console.log('CleverTapID', res, err);
        alert(`CleverTapID: \n ${res}`);
    });
}
// Location
userLocation = () => {
    alert('User Location set');

    CleverTap.setLocation(34.15, -118.20);

};
///Events

pushevent = () => {
    alert('Event Recorded');

    //Recording an Event
    CleverTap.recordEvent('testEvent');
    CleverTap.recordEvent('testEventWithProps', {'start': new Date(), 'foo': 'bar'});

};

pushchargedevent = () => {
    alert('Charged Event Recorded');

    //Recording an Event
    CleverTap.recordChargedEvent({'totalValue': 20, 'category': 'books', 'purchase_date': new Date()},
        [{'title': 'book1', 'published_date': new Date('2010-12-12T06:35:31'), 'author': 'ABC'},
            {'title': 'book2', 'published_date': new Date('2000-12-12T06:35:31')},
            {
                'title': 'book3', 'published_date': new Date(), 'author': 'XYZ'
            }]
    );

};
//App Inbox

appInbox = () => {


    //console.log('Display on called: ', res, err);


    //Show Inbox
    CleverTap.showInbox({
        'tabs': ['Offers', 'Promotions'],
        'navBarTitle': 'My App Inbox',
        'navBarTitleColor': '#FF0000',
        'navBarColor': '#FFFFFF',
        'inboxBackgroundColor': '#AED6F1',
        'backButtonColor': '#00FF00'
        ,
        'unselectedTabColor': '#0000FF',
        'selectedTabColor': '#FF0000',
        'selectedTabIndicatorColor': '#000000',
        'noMessageText': 'No message(s)',
        'noMessageTextColor': '#FF0000'
    });


};

getTotmsg = () => {
    //Get Total messagecount

    CleverTap.getInboxMessageCount((err, res) => {
        console.log('Total Messages: ', res, err);
        alert(`Total Messages: \n ${res}`);
    });
};
unread = () => {

    //Get the count of unread messages
    CleverTap.getInboxMessageUnreadCount((err, res) => {
        console.log('Unread Messages: ', res, err);
        alert(`Unread Messages: \n ${res}`);
    });
};
allmsg = () => {

    //Get All Inbox Messages
    CleverTap.getAllInboxMessages((err, res) => {
        console.log('All Inbox Messages: ', res, err);
        alert(`All Inbox Messages: \n ${res}`);
    });
};
allunreadmsg = () => {

    //get all Inbox unread messages
    CleverTap.getUnreadInboxMessages((err, res) => {
        console.log('Unread Inbox Messages: ', res, err);
        alert(`Unread Inbox Messages: \n ${res}`);
    });
};
inboxid = () => {
    //Get inbox Id

    CleverTap.getInboxMessageForId('Message Id', (err, res) => {
        console.log("marking message read = " + res);
        alert(`marking message read: \n ${res}`);
    });
};

deleteMsg = () => {
    //Get inbox Id
    alert('Check Console for values');
    CleverTap.deleteInboxMessageForId('Message Id');

};

markread = () => {
    //Get inbox Id
    alert('Check Console for values');
    CleverTap.markReadInboxMessageForId('Message Id');

};
pnviewed = () => {
    //Get inbox Id
    alert('Check Console for values');
    CleverTap.pushInboxNotificationViewedEventForId('Message Id');

};
pnclicked = () => {
    //Get inbox Id
    alert('Check Console for values');
    CleverTap.pushInboxNotificationClickedEventForId('Message Id');

};
///Push Notification
create_NC = () => {
    alert('Notification Channel Created');
    //Creating Notification Channel
    CleverTap.createNotificationChannel("CtRNS", "Clever Tap React Native Testing", "CT React Native Testing", 1, true);

};
delete_NC = () => {
    alert('Notification Channel Deleted');
    //Delete Notification Channel
    CleverTap.deleteNotificationChannel("RNTesting")

};

create_NCGroup = () => {
    alert('Notification Channel Group Created');
    //Creating a group notification channel
    //CleverTap.createNotificationChannelGroup(String groupId, String groupName)

};
delete_NCGroup = () => {
    alert('Notification Channel Group Deleted');
    //Delete a group notification channel
    //CleverTap.deleteNotificationChannelGroup(String groupId)

};

pushFcmRegistrationId = () => {
    alert('Registered FCM Id for Push');
    //Setting up a Push Notification
    if (Platform.OS === 'android') {
        // Use only during custom implementation and make sure that FCM credentials used to generate token are same as CleverTap
        // or else two different tokens will be pushed to BackEnd resulting in unwanted behavior
        // => https://github.com/CleverTap/clevertap-react-native/issues/166
        // => https://developer.clevertap.com/docs/android#section-custom-android-push-notifications-handling
        CleverTap.setPushToken("111056687894", CleverTap.FCM);
        //CleverTap.setPushToken("111056687894", CleverTap.HMS);//for Huawei push
        //CleverTap.setPushToken("111056687894", CleverTap.XPS);//for Xiaomi push
        //CleverTap.setPushToken("111056687894", CleverTap.BPS);//for Baidu push

    }

};
create_notification = () => {

    // createNotification in your custom implementation => https://developer.clevertap.com/docs/android#section-custom-android-push-notifications-handling

    // Please note, extras passed in below method is just for showcase, you need to pass the one that you receive from FCM
    CleverTap.createNotification({
        'wzrk_acct_id': '88R-R54-5Z6Z',
        'nm': 'Testing 1..2..3..',
        'nt': 'Test event',
        'pr': 'max',
        'wzrk_pivot': 'wzrk_default',
        'wzrk_ttl_s': '2419200',
        'wzrk_cid': 'CtRNS',
        'wzrk_pid': new Date().getTime(),
        'wzrk_rnv': false,
        'wzrk_ttl': '1627053990',
        'wzrk_push_amp': false,
        'wzrk_bc': '',
        'wzrk_bi': '2',
        'wzrk_dt': 'FIREBASE',
        'wzrk_id': '1624627506_20210625',
        'wzrk_pn': true
    });

};
//Native Display
getUnitID = () => {

    CleverTap.getDisplayUnitForId('Unit Id', (err, res) => {
        console.log('Get Display Unit for Id:', res, err);
        alert(`Get Display Unit for Id: ${res}`);
    });

};
getAllDisplayUnits = () => {

    CleverTap.getAllDisplayUnits((err, res) => {
        console.log('All Display Units: ', res, err);
        alert(`All Display Units: ${res}`);
    });

};
// Product Config 

productConfig = () => {
    alert('Product Configuration set to default');
    //Product config:
    CleverTap.setDefaultsMap({
        'text_color': 'red',
        'msg_count': 100,
        'price': 100.50,
        'is_shown': true,
        'json': '{"key":"val"}'
    });

};
fetch = () => {
    alert('Check Console for update result');
    //Fetch
    CleverTap.fetch();

};
activate = () => {
    alert('Check Console for update result');
    //Activate
    CleverTap.activate();

};
fetchAndActivate = () => {
    alert('Check Console for update result');

    //Fetch And Activate
    CleverTap.fetchAndActivate();

};
fetchwithMinIntervalinsec = () => {
    alert('Check Console for update result');

    //Fetch Minimum Time Interval
    CleverTap.fetchWithMinimumIntervalInSeconds(60);

};

setMinimumFetchIntervalInSeconds = () => {
    alert('Check Console for update result');

    //Set Minimum Interval
    CleverTap.setMinimumFetchIntervalInSeconds(60);

};
getBoolean = () => {

    //Boolean
    CleverTap.getProductConfigBoolean('is_shown', (err, res) => {
        console.log('PC is_shown val in boolean :', res, err);
        alert(`PC is_shown val in boolean : ${res}`);
    });


};
getLong = () => {
    alert('Check Console for update result');

    //Number
    CleverTap.getNumber('msg_count', (err, res) => {
        console.log('PC is_shown val in number(long)  :', res, err);
        alert(`PC is_shown val in number(long) : ${res}`);
    });


};
getDouble = () => {

    CleverTap.getNumber('price', (err, res) => {
        console.log('PC price val in number :', res, err);
        alert(`PC is_shown val in number(double) : ${res}`);
    });
};
getString = () => {
    alert('Check Console for update result');

    //Set Minimum Interval
    //String
    CleverTap.getProductConfigString('text_color', (err, res) => {
        console.log('PC text_color val in string :', res, err);
        alert(`PC is_shown val in String : ${res}`);
    });

};
getStrings = () => {
    alert('Check Console for update result');

    //Set Minimum Interval
    CleverTap.getProductConfigString('json', (err, res) => {
        console.log('PC json val in string :', res, err);
        alert(`PC json val in String : ${res}`);
    });

};
reset_config = () => {
    alert('Check Console for update result');
    //Reset Product config
    CleverTap.resetProductConfig();
};

getLastFetchTimeStampInMillis = () => {

    //get Last Fetch TimeStamp In Milliseconds
    CleverTap.getLastFetchTimeStampInMillis((err, res) => {
        console.log('LastFetchTimeStampInMillis in string: ', res, err);
        alert(`LastFetchTimeStampInMillis in string: ${res}`);
    });
};
//feature flag
getFeatureFlag = () => {

    //Feature flag
    CleverTap.getFeatureFlag('is_dark_mode', false, (err, res) => {
        console.log('FF is_dark_mode val in boolean :', res, err);
        alert(`FF is_dark_mode val in boolean :{res}`);
    });

};

//App Personalisation

enablePersonalization = () => {


    //enablePersonalization
    CleverTap.enablePersonalization();
    alert('enabled Personalization');

};
profile_getProperty = () => {


    //CleverTap Profile Name:
    CleverTap.profileGetProperty('Name', (err, res) => {
        console.log('CleverTap Profile Name: ', res, err);
        alert(`CleverTap Profile Name:${res}`);
    });

};
///Attributions
attri = () => {


    //Default Instance
    CleverTap.profileGetCleverTapAttributionIdentifier((err, res) => {
        console.log('CleverTapAttributionIdentifier', res, err);
        alert(`CleverTapAttributionIdentifier${res}`);
    });

};

function _handleOpenUrl(event, from) {
    console.log('handleOpenUrl', event.url, from);
}

function removeCleverTapAPIListeners() {
    // clean up listeners

    Linking.removeEventListener('url', _handleOpenUrl);
    CleverTap.removeListener(CleverTap.CleverTapProfileDidInitialize);
    CleverTap.removeListener(CleverTap.CleverTapProfileSync);
    CleverTap.removeListener(CleverTap.CleverTapInAppNotificationDismissed);
    CleverTap.removeListener(CleverTap.CleverTapInboxDidInitialize);
    CleverTap.removeListener(CleverTap.CleverTapInboxMessagesDidUpdate);
    CleverTap.removeListener(CleverTap.CleverTapInboxMessageButtonTapped);
    CleverTap.removeListener(CleverTap.CleverTapDisplayUnitsLoaded);
    CleverTap.removeListener(CleverTap.CleverTapInAppNotificationButtonTapped);
    CleverTap.removeListener(CleverTap.CleverTapFeatureFlagsDidUpdate);
    CleverTap.removeListener(CleverTap.CleverTapProductConfigDidInitialize);
    CleverTap.removeListener(CleverTap.CleverTapProductConfigDidFetch);
    CleverTap.removeListener(CleverTap.CleverTapProductConfigDidActivate);
    CleverTap.removeListener(CleverTap.CleverTapPushNotificationClicked);
    alert("Listeners removed successfully");
}

function addCleverTapAPIListeners(fromClick) {
    // optional: add listeners for CleverTap Events
    CleverTap.addListener(CleverTap.CleverTapProfileDidInitialize, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapProfileDidInitialize, event);
    });
    CleverTap.addListener(CleverTap.CleverTapProfileSync, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapProfileSync, event);
    });
    CleverTap.addListener(CleverTap.CleverTapInAppNotificationDismissed, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapInAppNotificationDismissed, event);
    });
    CleverTap.addListener(CleverTap.CleverTapInboxDidInitialize, (event) => {
        _handleCleverTapInbox(CleverTap.CleverTapInboxDidInitialize, event);
    });
    CleverTap.addListener(CleverTap.CleverTapInboxMessagesDidUpdate, (event) => {
        _handleCleverTapInbox(CleverTap.CleverTapInboxMessagesDidUpdate, event);
    });
    CleverTap.addListener(CleverTap.CleverTapInboxMessageButtonTapped, (event) => {
        _handleCleverTapInbox(CleverTap.CleverTapInboxMessageButtonTapped, event);
    });
    CleverTap.addListener(CleverTap.CleverTapDisplayUnitsLoaded, (event) => {
        _handleCleverTapDisplayUnitsLoaded(CleverTap.CleverTapDisplayUnitsLoaded, event);
    });
    CleverTap.addListener(CleverTap.CleverTapInAppNotificationButtonTapped, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapInAppNotificationButtonTapped, event);
    });
    CleverTap.addListener(CleverTap.CleverTapFeatureFlagsDidUpdate, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapFeatureFlagsDidUpdate, event);
    });
    CleverTap.addListener(CleverTap.CleverTapProductConfigDidInitialize, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapProductConfigDidInitialize, event);
    });
    CleverTap.addListener(CleverTap.CleverTapProductConfigDidFetch, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapProductConfigDidFetch, event);
    });
    CleverTap.addListener(CleverTap.CleverTapProductConfigDidActivate, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapProductConfigDidActivate, event);
    });
    CleverTap.addListener(CleverTap.CleverTapPushNotificationClicked, (event) => {
        _handleCleverTapEvent(CleverTap.CleverTapPushNotificationClicked, event);
    });

    if (fromClick) {
        alert("Listeners added successfully");
    }
}

function createNotificationChannelWithSound() {
    // https://developer.clevertap.com/docs/add-a-sound-file-to-your-android-app

    CleverTap.createNotificationChannelWithSound("CtRNS", "Clever Tap React Native Testing",
        "CT React Native Testing", 1, true, "glitch.mp3")
}


function _handleCleverTapEvent(eventName, event) {
    console.log('handleCleverTapEvent', eventName, event);
    ToastAndroid.show(`${eventName} called!`, ToastAndroid.SHORT);
}

function _handleCleverTapInbox(eventName, event) {
    console.log('handleCleverTapInbox', eventName, event);
    ToastAndroid.show(`${eventName} called!`, ToastAndroid.SHORT);
}

function _handleCleverTapDisplayUnitsLoaded(eventName, event) {
    console.log('handleCleverTapDisplayUnitsLoaded', eventName, event);
    ToastAndroid.show(`${eventName} called!`, ToastAndroid.SHORT);
}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#F5FCFF',
    },

    iconStyle: {

        width: 30,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        tintColor: '#fff'

    },

    sub_Category_Text: {
        fontSize: 18,
        color: '#000',
        padding: 10
    },

    category_Text: {
        textAlign: 'left',
        color: '#fff',
        fontSize: 21,
        padding: 10
    },

    category_View: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#b300ea'
    },

    Btn: {
        padding: 10,
        backgroundColor: '#FF6F00'
    }

});