import React, { useState, useEffect, useContext } from 'react';
import { db, storage } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage';
import { AuthContext } from '../components/AuthProvider';

function Skill() {
  const [todo, setTodo] = useState("");
  const [todo1, setTodo1] = useState("");
  const [todos, setTodos] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [temuuid, setTemuuid] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [oldImageUrl, setOldImageUrl] = useState(""); // Menyimpan URL gambar lama untuk dihapus

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];

  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  
  const handleTodoChange1 = (e) => {
    setTodo1(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (allowedImageTypes.includes(file.type)) {
        setImageUpload(file);
      } else {
        alert('Web ini hanya mendukung file bertipe (JPG, JPEG, PNG, SVG, GIF)');
        setImageUpload(null);
      }
    }
  };

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const loadedTodos = Object.values(data);
        setTodos(loadedTodos);
      } else {
        setTodos([]);
      }
    });
  }, []);

  const uploadFileAndWriteToDatabase = () => {
    if (!imageUpload) {
      writeToDatabase();
      return;
    }

    const imageRef = storageRef(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (oldImageUrl) {
          const oldImageRef = storageRef(storage, oldImageUrl);
          deleteObject(oldImageRef).catch((error) => {
            console.error("Error saat menghapus gambar lama:", error);
          });
        }
        writeToDatabase(url);
      }).catch((error) => {
        console.error("Error saat mendownload URL:", error);
      });
    }).catch((error) => {
      console.error("Error dalam mengupload file:", error);
    });
  };

  const writeToDatabase = (imageUrl = '') => {
    const uuid = isedit ? temuuid : uid();
    set(ref(db, `/${uuid}`), {
      todo,
      todo1,
      uuid,
      imageUrl
    }).then(() => {
      setTodo("");
      setTodo1("");
      setImageUpload(null);
      setIsedit(false);
    }).catch((error) => {
      console.error("Error saat menulis ke Database:", error);
    });
  };

  const handleUpdate = (todo) => {
    setIsedit(true);
    setTemuuid(todo.uuid);
    setTodo(todo.todo);
    setTodo1(todo.todo1);
    setOldImageUrl(todo.imageUrl || ""); // Menyimpan URL gambar lama
  };

  const handleSubmit = () => {
    uploadFileAndWriteToDatabase();
  };

  const handleDelete = (todo) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      remove(ref(db, `/${todo.uuid}`)).then(() => {
        if (todo.imageUrl) {
          const oldImageRef = storageRef(storage, todo.imageUrl);
          deleteObject(oldImageRef).catch((error) => {
            console.error("Error saat menghapus gambar:", error);
          });
        }
      }).catch((error) => {
        console.error("Error saat menghapus file:", error);
      });
    }
  };

  const { user } = useContext(AuthContext);

  return user == null ? (
    <>
      <div className='services-box pt-12 grid md:grid-cols-3 grid-cols-1 gap-6'>
        {todos.map((data, key) => (
          <div key={key} className='box bg-gray-500 rounded-lg shadow p-4 mt-6 flex flex-col'>
            <h1 className='bg-slate-700 text-white p-2 rounded text-center'>{data.todo}</h1>
            <p className='bg-gray-700 mt-4 text-white p-2 rounded break-words'>{data.todo1}</p>
            {data.imageUrl && <img src={data.imageUrl} alt="Uploaded" className='mt-2 w-40 h-40 justify-center m-20 mb-4 rounded-lg' />}
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className='py-8 mx'>
      <div className="border border-gray-700 bg-gray-600 max-w-[1200px] mx-auto md:flex-row h-auto p-6 justify-center" id='Skill'>
        <div>
          <h1 className='text-4xl sm:text-5xl flex justify-center font-bold text-white'>Skill</h1>
          <p className='text-normal text-lg text-gray-100 flex justify-center mt-2'>
             skill yang saya miliki saat ini 
          </p>
          <br />
        </div>
        
        <div className='services-box pt-12 grid md:grid-cols-3 grid-cols-1 gap-6'>
          {todos.map((data, key) => (
            <div key={key} className='box bg-gray-500 rounded-lg shadow p-4 mt-6 flex flex-col'>
              <h1 className='bg-slate-700 text-white p-2 rounded text-center'>{data.todo}</h1>
              <p className='bg-gray-700 mt-4 text-white p-2 rounded break-words'>{data.todo1}</p>
              {data.imageUrl && <img src={data.imageUrl} alt="Uploaded" className='mt-2 w-40 h-40 justify-center m-20 mb-4 rounded-lg' />}
              <div className='flex space-x-2 mt-3 justify-between'>
                <button onClick={() => handleUpdate(data)} className='bg-blue-600 text-white py-1 px-3 rounded-lg'>Update</button>
                <button onClick={() => handleDelete(data)} className='bg-red-600 text-white py-1 px-3 rounded-lg'>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col bg-gray-500 p-4 mr-4 md:w-1/3 rounded-3xl h-auto mt-6'>
          <input
            type="text"
            value={todo}
            onChange={handleTodoChange}
            className='mb-4 p-2 rounded border border-gray-600 bg-gray-700 text-white'
            placeholder="Masukkan Skill"
          />
          <input
            type="text"
            value={todo1}
            onChange={handleTodoChange1}
            className='mb-4 p-2 rounded border border-gray-600 bg-gray-700 text-white'
            placeholder="Deskripsi"
          />
          <input
            type="file"
            accept="image/jpeg, image/png, image/svg+xml, image/gif" 
            onChange={handleImageChange}
            className='mb-4 p-2 rounded border border-gray-600 bg-gray-700'
          />
          {isedit ? (
            <div className='flex space-x-2'>
              <button onClick={handleSubmit} className='bg-blue-600 text-white font-bold py-2 px-4 rounded'>Submit Change</button>
              <button
                onClick={() => {
                  setIsedit(false);
                  setTodo("");
                  setTodo1("");
                  setOldImageUrl(""); // Reset URL gambar lama
                }}
                className='bg-red-600 text-white font-bold py-2 px-4 rounded'
              >
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={uploadFileAndWriteToDatabase} className='bg-green-600 text-white font-bold py-2 px-4 rounded'>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skill;





// import React, { useState, useEffect, useContext } from 'react';
// import { db, storage } from "../firebase";
// import { uid } from "uid";
// import { set, ref, onValue, remove, update } from "firebase/database";
// import { getDownloadURL, ref as storageRef, uploadBytes, deleteObject } from 'firebase/storage';
// import { AuthContext } from '../AuthProvider';

// function Skill() {
//   const [todo, setTodo] = useState("");
//   const [todo1, setTodo1] = useState("");
//   const [todos, setTodos] = useState([]);
//   const [isedit, setIsedit] = useState(false);
//   const [temuuid, setTemuuid] = useState("");
//   const [imageUpload, setImageUpload] = useState(null);
//   const [oldImageUrl, setOldImageUrl] = useState(""); // Menyimpan URL gambar lama untuk dihapus

//   const allowedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];

//   const handleTodoChange = (e) => {
//     setTodo(e.target.value);
//   };
  
//   const handleTodoChange1 = (e) => {
//     setTodo1(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (allowedImageTypes.includes(file.type)) {
//         setImageUpload(file);
//       } else {
//         alert('Web ini hanya mendukung file bertipe (JPG, JPEG, PNG, SVG, GIF)');
//         setImageUpload(null);
//       }
//     }
//   };

//   useEffect(() => {
//     onValue(ref(db), (snapshot) => {
//       const data = snapshot.val();
//       if (data !== null) {
//         const loadedTodos = Object.values(data);
//         setTodos(loadedTodos);
//       } else {
//         setTodos([]);
//       }
//     });
//   }, []);

//   const uploadFileAndWriteToDatabase = () => {
//     if (!imageUpload) {
//       writeToDatabase();
//       return;
//     }

//     const imageRef = storageRef(storage, `images/${imageUpload.name}`);

//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         if (oldImageUrl) {
//           const oldImageRef = storageRef(storage, oldImageUrl);
//           deleteObject(oldImageRef).catch((error) => {
//             console.error("Error saat menghapus gambar lama:", error);
//           });
//         }
//         writeToDatabase(url);
//       }).catch((error) => {
//         console.error("Error saat mendownload URL:", error);
//       });
//     }).catch((error) => {
//       console.error("Error dalam mengupload file:", error);
//     });
//   };

//   const writeToDatabase = (imageUrl = '') => {
//     const uuid = isedit ? temuuid : uid();
//     set(ref(db, `/${uuid}`), {
//       todo,
//       todo1,
//       uuid,
//       imageUrl
//     }).then(() => {
//       setTodo("");
//       setTodo1("");
//       setImageUpload(null);
//       setIsedit(false);
//     }).catch((error) => {
//       console.error("Error saat menulis ke Database:", error);
//     });
//   };

//   const handleUpdate = (todo) => {
//     setIsedit(true);
//     setTemuuid(todo.uuid);
//     setTodo(todo.todo);
//     setTodo1(todo.todo1);
//     setOldImageUrl(todo.imageUrl || ""); // Menyimpan URL gambar lama
//   };

//   const handleSubmit = () => {
//     uploadFileAndWriteToDatabase();
//   };

//   const handleDelete = (todo) => {
//     if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
//       remove(ref(db, `/${todo.uuid}`)).then(() => {
//         if (todo.imageUrl) {
//           const oldImageRef = storageRef(storage, todo.imageUrl);
//           deleteObject(oldImageRef).catch((error) => {
//             console.error("Error saat menghapus gambar:", error);
//           });
//         }
//       }).catch((error) => {
//         console.error("Error saat menghapus file:", error);
//       });
//     }
//   };

//       const {user} = useContext(AuthContext);

//   return user == null ?(<>
//        <div className='services-box pt-12 grid md:grid-cols-3 grid-cols-1 gap-6'>
//           {todos.map((data, key) => (
//             <div key={key} className='box bg-gray-500 rounded-lg shadow p-4 mt-6 flex flex-col'>
//               <h1 className='bg-slate-700 text-white p-2 rounded text-center'>{data.todo}</h1>
//               <p className='bg-gray-700 mt-4 text-white p-2 rounded break-words'>{data.todo1}</p>
//               {data.imageUrl && <img src={data.imageUrl} alt="Uploaded" className='mt-2 w-40 h-40 justify-center m-20 mb-4 rounded-lg' />}
              
//             </div>
//           ))}
//         </div>
//   </>) : (
//     <div className='py-8 mx'>
//       <div className="border border-gray-700 bg-gray-600 max-w-[1200px] mx-auto md:flex-row h-auto p-6 justify-center" id='Skill'>
//         <div>
//           <h1 className='text-4xl sm:text-5xl flex justify-center  font-bold text-white'>Skill</h1>
//           <p className='text-normal text-lg text-gray-100 flex justify-center mt-2'>
//              skill yang saya miliki saat ini 
//           </p>
//           <br />
//         </div>
        
//         <div className='services-box pt-12 grid md:grid-cols-3 grid-cols-1 gap-6'>
//           {todos.map((data, key) => (
//             <div key={key} className='box bg-gray-500 rounded-lg shadow p-4 mt-6 flex flex-col'>
//               <h1 className='bg-slate-700 text-white p-2 rounded text-center'>{data.todo}</h1>
//               <p className='bg-gray-700 mt-4 text-white p-2 rounded break-words'>{data.todo1}</p>
//               {data.imageUrl && <img src={data.imageUrl} alt="Uploaded" className='mt-2 w-40 h-40 justify-center m-20 mb-4 rounded-lg' />}
//               <div className='flex space-x-2 mt-3 justify-between'>
//                 <button onClick={() => handleUpdate(data)} className='bg-blue-600 text-white py-1 px-3 rounded-lg'>Update</button>
//                 <button onClick={() => handleDelete(data)} className='bg-red-600 text-white py-1 px-3 rounded-lg'>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className='flex flex-col bg-gray-500 p-4 mr-4 md:w-1/3 rounded-3xl h-auto mt-6'>
//           <input
//             type="text"
//             value={todo}
//             onChange={handleTodoChange}
//             className='mb-4 p-2 rounded border border-gray-600 bg-gray-700 text-white'
//             placeholder="Masukkan Skill"
//           />
//           <input
//             type="text"
//             value={todo1}
//             onChange={handleTodoChange1}
//             className='mb-4 p-2 rounded border border-gray-600 bg-gray-700 text-white'
//             placeholder="Deskripsi"
//           />
//           <input
//             type="file"
//             accept="image/jpeg, image/png, image/svg+xml, image/gif" 
//             onChange={handleImageChange}
//             className='mb-4 p-2 rounded border border-gray-600 bg-gray-700'
//           />
//           {isedit ? (
//             <div className='flex space-x-2'>
//               <button onClick={handleSubmit} className='bg-blue-600 text-white font-bold py-2 px-4 rounded'>Submit Change</button>
//               <button
//                 onClick={() => {
//                   setIsedit(false);
//                   setTodo("");
//                   setTodo1("");
//                   setOldImageUrl(""); // Reset URL gambar lama
//                 }}
//                 className='bg-red-600 text-white font-bold py-2 px-4 rounded'
//               >
//                 Cancel
//               </button>
//             </div>
//           ) : (
//             <button onClick={uploadFileAndWriteToDatabase} className='bg-green-600 text-white font-bold py-2 px-4 rounded'>Submit</button>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Skill;
