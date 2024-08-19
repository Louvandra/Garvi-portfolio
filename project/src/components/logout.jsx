// import { signOut } from "firebase/auth";

// const handleLogout = async () => {
//   const user = auth.currentUser;

//   if (user) {
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     if (userSnap.exists()) {
//       const userData = userSnap.data();
//       await setDoc(userRef, {
//         ...userData,
//         loggedInCount: Math.max(0, userData.loggedInCount - 1),
//       });
//     }

//     await signOut(auth);
//     navigate('/login');
//   }
// };

//   export default handleLogout;