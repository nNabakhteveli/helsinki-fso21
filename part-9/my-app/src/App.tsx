import React from 'react';


const SinglePartRenderer = ({course, childKey}: {course: CoursePart, childKey: number}): JSX.Element => {
   switch(course.type) {
      case 'normal':
         return ( 
            <div key={childKey}>
               <p><b>{course.name}</b> {course.exerciseCount}</p>
               <i>Description: {course.description}</i>
            </div>
         );
      
      case "groupProject":
         return(
            <div key={childKey}>
               <p><b>{course.name}</b> {course.exerciseCount}</p>
               <p>Group project count: {course.groupProjectCount}</p>
            </div>
         );

      case 'submission':
         return(
            <div key={childKey}>
               <p><b>{course.name}</b> {course.exerciseCount}</p>
               <i>Description: {course.description}</i>
               <p>Link: {course.exerciseSubmissionLink}</p>
            </div>
         );

      case "special": 
         return(
            <div key={childKey}>
               <p><b>{course.name}</b> {course.exerciseCount}</p>
               <i>Description: {course.description}</i>
               <p>Requirements:</p>
               <ul key={childKey}>
                  {course.requirements.map((value, i) => <li key={i}>{value}</li>)}
               </ul>
            </div>
         );
   }
}


const Total = ({ totalExercises }: { totalExercises: number }): JSX.Element => <p>Number of exercises{` ${totalExercises}`}</p>;


interface CourseParts {
   name: string,
   exerciseCount: number
}

interface CoursePartBase {
   name: string;
   exerciseCount: number;
   type: string;
}

interface NewInterface extends CoursePartBase {
   description: string
}

interface CourseNormalPart extends NewInterface {
   type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
   type: "groupProject";
   groupProjectCount: number;
}

interface CourseSubmissionPart extends NewInterface {
   type: "submission";
   exerciseSubmissionLink: string;
}

interface Backend extends NewInterface {
   type: "special",
   requirements: Array<string>,
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | Backend;

const Content = ({ arr }: { arr: Array<CoursePart> }): JSX.Element => {
   return (
      <div>
         {
            arr.map(value => <SinglePartRenderer course={value} childKey={Math.random() * 500000} />)
         }
      </div>
   );
}

const Header = ({ courseName }: { courseName: string }): JSX.Element => <h1>{courseName}</h1>;

const App = () => {
   const courseName = "Half Stack application development";

   const courseParts: CoursePart[] = [
      {
         name: "Fundamentals",
         exerciseCount: 10,
         description: "This is the leisured course part",
         type: "normal"
      },
      {
         name: "Advanced",
         exerciseCount: 7,
         description: "This is the harded course part",
         type: "normal"
      },
      {
         name: "Using props to pass data",
         exerciseCount: 7,
         groupProjectCount: 3,
         type: "groupProject"
      },
      {
         name: "Deeper type usage",
         exerciseCount: 14,
         description: "Confusing description",
         exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
         type: "submission"
      },
      {
         name: "Backend development",
         exerciseCount: 21,
         description: "Typing the backend",
         requirements: ["nodejs", "jest"],
         type: "special"
       }       
   ]


   const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

   return (
      <div>
         <Header courseName={courseName} />
         <Content arr={courseParts} />
         <Total totalExercises={totalExercises} />
      </div>
   );
};

export default App;
