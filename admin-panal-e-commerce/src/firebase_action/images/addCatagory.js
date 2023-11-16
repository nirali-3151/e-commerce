import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    Timestamp,
    orderBy,
    setDoc,
    doc,
    getDoc,
    updateDoc,
    getDocs,
    deleteDoc,
    limit,
    startAfter,
    endBefore,
    startAt,
    limitToLast
} from 'firebase/firestore'

import {
    ref,
    getDownloadURL,
    uploadBytes,
    deleteObject,
    uploadBytesResumable
} from "firebase/storage";

import {
    auth,
    db,
    storage
} from "firebase.js"

let url;

//store catagory image
export const storeCatagoryImage = async (img) => {
    return new Promise(async (resolve, reject) => {
        const imgRef = ref(
            storage,
            `catagories/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;
        resolve(url)
    })
}

//store sub catagory image
export const storeSubCatagoryImage = async (img) => {
    return new Promise(async (resolve, reject) => {
        const imgRef = ref(
            storage,
            `subCatagories/${new Date().getTime()} - ${img.name}`
        );
        const snap = await uploadBytes(imgRef, img);
        const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url = dlUrl;

        resolve(url)
    })
}

//store products
export const storeProductsImage = async (img) => {
    let url1 = [];
    return new Promise(async (resolve, reject) => {
        img.forEach((element, index) => {
            const imgRef = ref(
                storage,
                `products/${new Date().getTime()} - ${element.name}`
            );

            const uploadTask = uploadBytesResumable(imgRef, element);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const imgProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error) => {
                    console.log("error is : ", error);
                },
                 async () => {
                     await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        url1 = [...url1 ,downloadURL ]
                        if(img.length == url1.length) {
                            resolve(url1)
                        }
                    });
                }
            );
        });
    })
}