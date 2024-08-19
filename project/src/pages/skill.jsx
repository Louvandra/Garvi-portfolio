import React, { useState, useEffect } from 'react';
import { db, storage } from "../firebase";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

function Skill() {
  const [todo, setTodo] = useState("");
  const [todo1, setTodo1] = useState("");
  const [todos, setTodos] = useState([]);
  const [isedit, setIsedit] = useState(false);
  const [temuuid, setTemuuid] = useState("");
  const [imageUpload, setImageUpload] = useState(null); 

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']; // Define allowed image MIME types

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
        writeToDatabase(url); 
      }).catch((error) => {
        console.error("Error saat mendownload URL:", error);
      });
    }).catch((error) => {
      console.error("Error dalam mengupload file:", error);
    });
  };

  const writeToDatabase = (imageUrl = '') => {
    const uuid = uid();
    set(ref(db,`/${uuid}`), {
      todo,
      todo1,
      uuid,
      imageUrl 
    }).then(() => {
      setTodo("");
      setTodo1("");
      setImageUpload(null); 
    }).catch((error) => {
      console.error("Error saat membaca Database:", error);
    });
  };

  const handleUpdate = (todo) => {
    setIsedit(true);
    setTemuuid(todo.uuid);
    setTodo(todo.todo);
    setTodo1(todo.todo1);
  };

  const handleSubmit = () => {
    update(ref(db, `/${temuuid}`), {
      todo,
      todo1,
      uuid: temuuid,
    }).then(() => {
      setTodo("");
      setTodo1("");
      setIsedit(false);
    }).catch((error) => {
      console.error("Error saat memperbarui file:", error);
    });
  };

  const handleDelete = (todo) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item ini?")) {
      remove(ref(db, `/${todo.uuid}`)).catch((error) => {
        console.error("Error saat menghapus file:", error);
      });
    }
  };
  

  return (
    <div className='py-8 mx'>
      <div className="border border-gray-700 bg-gray-900 max-w-[1200px] mx-auto md:flex-row h-auto p-6 justify-center" id='Skill'>
        <div>
          <h1 className='text-4xl sm:text-5xl text-white'>Skill <span>Saya</span></h1>
          <p className='text-normal text-lg text-gray-300 mt-2'>
            Berikut adalah beberapa skill yang saya miliki saat ini 
          </p>
          <br />
          <div className='flex flex-col bg-gray-800 p-4 mr-4 md:w-1/3 rounded-3xl h-auto'>
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
        <div className='services-box pt-12 grid md:grid-cols-3 grid-cols-1 gap-6 '>
  {todos.map((data, key) => (
    <div key={key} className='box bg-gray-700 rounded-lg shadow p-4 mt-6 flex flex-col'>
      <h1 className='bg-slate-600 text-white p-2 rounded text-center'>{data.todo}</h1>
      <p className='bg-gray-500 mt-4 text-gray-300 p-2 rounded break-words'>{data.todo1}</p>
      {data.imageUrl && <img src={data.imageUrl} alt="Uploaded" className='mt-2 w-40 h-40 justify-center m-20 mb-4 rounded-lg' />}
      <div className='flex space-x-2 mt-3 justify-between'>
        <button onClick={() => handleUpdate(data)} className='bg-blue-600 text-white py-1 px-3 rounded-lg'>Update</button>
        <button onClick={() => handleDelete(data)} className='bg-red-600 text-white py-1 px-3 rounded-lg'>Delete</button>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
}

export default Skill;