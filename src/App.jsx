import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/login'
import Register from './components/register'
import Notes from './components/notes'
import ProtectedRoute from './components/ProtectedRoute'


function App() {


  return (
    <>
    <Routes>
      <Route path="/" element= {<Login />} />
      <Route path="/login" element={ <Login /> }  />
      <Route path="/register" element = { <Register /> } />   
      <Route path="/notes" element = {
        <ProtectedRoute>
          <Notes />
        </ProtectedRoute>} />
    </Routes>
    </>
  )}


export default App

