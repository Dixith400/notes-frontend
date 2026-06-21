import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const Notes = () => {
    const [notes, setNotes] = useState([])
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [editId, setEditId] = useState(null)
    const [editName, setEditName] = useState("")
    const [editContent, setEditContent] = useState("")
    const navigate = useNavigate()

    useEffect(() => {fetchNotes()},[])

    const logout = () => {
      localStorage.removeItem("token")
      navigate("/login")
    }
    // ------- fetchNotes -----------------------------------------------------------------------------------------------------------------

    const fetchNotes = async () => {
        const token = localStorage.getItem("token")

        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`, 
            {
                headers : {"Authorization" : `Bearer ${token}`}
            }
        )
        const data = await response.json()
        setNotes(data)
    }

    // ------- create notes  ------------

    const createNote = async() => {
        const token = localStorage.getItem("token") 

        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" :   `Bearer ${token}`
                
            },
            body : JSON.stringify({name, content})
            
        })

        const data = await response.json()
        console.log(data)
        fetchNotes()
        setContent("")
        setName("")
    }

    // ------- update notes  -----------------------------------------------------------------------------------------------------------------

    const updateNote = async () => {
        const token = localStorage.getItem("token")

        const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${editId}`, {
            method: "PUT", 
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name: editName, content: editContent})
        })

        const data = await response.json()
        console.log(data)
        setEditId(null)
        fetchNotes()
    }

        // ------- delete notes  -----------------------------------------------------------------------------------------------------------------
        const deleteNote = async (noteId) => {
          const token = localStorage.getItem("token")
          const response = await fetch(`${import.meta.env.VITE_API_URL}/notes/${noteId}`,{
            method: "DELETE",
            headers : {
              "Authorization": `Bearer ${token }`,
             
            }
          } )

          const data = await response.json()
          console.log(data)
          fetchNotes()
          
        }
    

    return (
            <div className="min-h-screen bg-gray-100 p-8">
                
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Notes</h1>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </div>

                <div className="bg-white rounded-lg p-4 shadow mb-6">
                    <input
                        type="text"
                        placeholder="Title"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border p-2 rounded mb-3"
                    />
                    
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="w-full border p-2 rounded mb-3"
                        rows={4}
                    />
                    
                    <button
                        onClick={createNote}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Note
                    </button>
                </div>
          
                
                <div className="grid grid-cols-3 gap-4">


   {/* ------ this is also the return statement itself just for convenience the indentation is set different  */}               
                  
                {notes.map(note => (
                  <div key={note._id} className="bg-white rounded-lg p-4 shadow">
                    
                    {editId === note._id ? (
                      <>
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="w-full border p-2 rounded mb-3"
                        />
                        <textarea
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                          className="w-full border p-2 rounded mb-3"
                          rows={4}
                        />
                        <button
                          onClick={updateNote}
                          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <h2 className="text-lg font-bold">{note.name}</h2>
                        <p className="text-gray-600 mt-2">{note.content}</p>
                        <button
                          onClick={() => {
                            setEditId(note._id)
                            setEditName(note.name)
                            setEditContent(note.content)
                          }}
                          className="bg-yellow-500 text-white px-4 py-2 rounded mt-3"
                        >
                          Edit
                        </button>
                        <button
                            onClick={() => deleteNote(note._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-3 ml-2"
                          >
                            Delete
                        </button>
                      </>
                    )}
                  </div>
                ))}
                </div>
            </div>
)
}

export default Notes