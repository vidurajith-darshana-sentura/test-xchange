import {auth, firestore, messaging} from './firebaseConfig';
import {useState} from "react";
import {REMOVE_DUPLICATE_OBJECT} from "../../util/JSArray";

// default password
const password = 'SuperSecretPassword!';


/* Authentication
    * Link: https://rnfirebase.io/auth/usage
    * Email/Password sign-in
 */

const signIn = (email) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.info('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                console.info('That email address is invalid!');
            }

        });
}

const signOut = async () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'))
        .catch(error => console.log(error));
}


/**  FCM - ios permission
 * Link: https://rnfirebase.io/messaging/usage
 */
async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
}


/* =============================================
    Cloud Firestore
    * Link: https://rnfirebase.io/firestore/usage
    * ADD, DELETE, DELETE ALL, GET ALL
   =============================================
 */



const getPrivateChatHandler = async (partnerId) => {
    let get = await firestore().collection('privateChat').get();
    console.log("---------------------")
    console.log("---------------------")
    let filter = get?._docs.filter(item => {
        let data = item?._data
        if ((data.receiverId == global.userId && data.senderId ===  partnerId)
            || (data.receiverId == partnerId && data.senderId ===  global.userId)) {
            return item;
        }
    });
    console.log(filter)
    console.log("---------------------")
    console.log("---------------------")

        return filter;

}

const manualPrivateChatHandler =  (data, partnerId) => {
    console.log(data, " ------- ", partnerId)
    console.log("---------------------")
    console.log("---------------------")
    let filter = data.filter(item => {
        let data = item?._data
        if ((data.receiverId == global.userId && data.senderId ===  partnerId)
            || (data.receiverId == partnerId && data.senderId ===  global.userId)) {
            return item;
        }
    });
    console.log("FilterDto: ", filter)
    console.log("---------------------")
    console.log("---------------------")
    if (filter.length > 0) {
        return filter;
    } else {
        return [];
    }

}






const sendPrivateMessage = ({ receiverId = 0,
                                receiverName = "",
                                    receiverImage = "",
                                        senderId = 0,
                                            senderName = "",
                                                senderImage = "",
                                                        message = ""}) => {
    firestore()
        .collection('privateChat')
        .add({
            receiverId: receiverId,
            receiverName: receiverName,
            receiverImage: receiverImage,
            senderId: senderId,
            senderName: senderName,
            senderImage: senderImage,
            message: message,
            dateTime: new Date().toLocaleString(),
            isRead: false
        })
        .then(() => {
            // nothing
        }).catch(error => {
        console.log(error)
    });
}



const getChatterListHandler = async () => {
    let get = await firestore().collection('privateChat').get();
    // console.log("---------------------")
    // console.log("---------------------")
    let filter = get?._docs?.filter(item => {
        let data = item?._data
        if ((data.senderId == global.userId || data.receiverId === global.userId)) {
            return item;
        }
    });
    // console.log(filter)
    // console.log("---------------------")
    // console.log("---------------------")

    let data =[];

    filter.map(item => {
        let temp = item?._data;
        if (temp.senderId === global.userId) {
            data.push({id: temp.receiverId, name: temp.receiverName, image: temp.receiverImage });
        } else if (temp.receiverId === global.userId) {
            data.push({id: temp.senderId, name: temp.senderName, image: temp.senderImage });
        }
    });


    let arr = REMOVE_DUPLICATE_OBJECT(data, "id");

    if (arr.length > 0) {
        return arr;
    } else {
        return [];
    }

}


















const saveConversationHandler = ({
                                     receiverId = 0,
                                     receiverName = "",
                                     receiverImage = "",
                                     senderId = 0,
                                     senderName = "",
                                     senderImage = "",
                                     // message = ""
                                 }) => {
    firestore()
        .collection('openConversation')
        .add({
            receiverId,
            receiverName,
            receiverImage,
            senderId,
            senderName,
            senderImage,
            // message,
            dateTime: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            // nothing
        }).catch(error => {
        console.log(error)
    });
}






const getConversationsHandler = (myID, getValueHandler) => {
    firestore()
        .collection('openConversation')
        .where('receiverId', '==', myID)
        .where('senderId', '==', myID)
        .get()
        .then((res) => {
            getValueHandler(res);
            console.log(res)
        }).catch(err => {
            getValueHandler(null)
            console.warn(err)
        });

}

const getMyConversationsHandler = (myID, getValueHandler) => {
    firestore()
        .collection('openConversation')
        // .where('receiverId', '==', myID)
        .where('senderId', '==', myID)
        .get()
        .then((res) => {
            getValueHandler(res);
            console.log(res)
        }).catch(err => {
            getValueHandler(null)
            console.warn(err)
        });

}

// const getPrivateChatHandler = (conversationId, getValueHandler) => {
//     firestore()
//         .collection('privateChat')
//         .where('conversationId', '==', conversationId)
//         .get()
//         .then((res) => {
//             getValueHandler(res);
//             console.log(res)
//         }).catch(err => {
//         getValueHandler(null)
//         console.warn(err)
//     });
//
// }



const getUnReadMessages = (conversationId, getValueHandler) => {
    firestore()
        .collection('privateChat')
        .where('conversationId', '==', conversationId)
        .where('isRead', '==', false)
        .get()
        .then((res) => {
            getValueHandler(res)
        }).catch(err => {
            getValueHandler(null)
            console.warn(err)
        });
}

const updateReadMessages = async (conversationId) => {

    if (conversationId) {
        let getData = await firestore().collection("privateChat")
            .where('conversationId', '==', conversationId)
            .where('isRead', '==', false)
            .get();

        if (getData) {
            getData._docs.map(async (doc) => {
                let updateData = await firestore().collection("privateChat")
                    .doc(doc.id)
                    .update({
                        isRead: true
                    });
                if (updateData) {
                    // console.log("Document updated!")
                }
            });

        } else {
            // TODO:nothing
        }
    }
}




// TODO: don't use, because these API under the development
const deletePrivateMessages = () => {
    firestore()
        .collection('privateChat')
        .delete()
        .then(() => {
            console.log('Users list are deleted!');
        });
}

const deletePrivateMessage = () => {
    firestore()
        .collection('privateChat')
        .doc('ABC')
        .delete()
        .then(() => {
            console.log('User deleted!');
        });
}


export {
    saveConversationHandler,
    sendPrivateMessage,
    getMyConversationsHandler,
    getPrivateChatHandler,
    getUnReadMessages,
    updateReadMessages,

    manualPrivateChatHandler
}
