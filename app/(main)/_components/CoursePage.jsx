import React from 'react'
import CourseBanner from './CourseBanner'
import Categories from './Categories'
import Courses from './Courses'

const CoursePage = () => {
  return (
    <div>
        <CourseBanner/>
        <Categories removeTop={true} isCoursePage={true}/>
        <Courses isCoursePage={true}/>
    </div>
  )
}

export default CoursePage