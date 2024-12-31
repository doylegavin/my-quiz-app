# Leaving Cert Revision App

#### Video Demo: [https://youtu.be/wZHb5tFALho](https://youtu.be/wZHb5tFALho)

#### Link: [https://my-quiz-p6azf7eqb-gavinthecraics-projects.vercel.app/quiz/create](https://my-quiz-p6azf7eqb-gavinthecraics-projects.vercel.app/quiz/create)

#### Github: [https://github.com/doylegavin/my-quiz-app](https://github.com/doylegavin/my-quiz-app)

Note: Here is the link to the Github respository I have been using, I continue to keep using this to update and improve this project. The link attatched above is the link to what has been completed up until the 31 Dec 2024. 




#### Description:

My Leaving Cert Revision App is a dynamic and interactive platform designed to help Irish students prepare for their Leaving Certificate exams. This project aims to make the study process more engaging and efficient by providing tailored quizzes based on the three most commonly taken subjects in Irish high schools: English, Irish, and Maths. The app leverages cutting-edge technology to ensure students can optimize their leaning experience.

## Features

The Leaving Cert Revision App includes the following features

1. **Customised Questions for All Levels and Abilities**: Users can generate quizzes tailored to their skill level and specific topics, ensuring focused and personalized study sessions
2. **Exam-Style Questions**: Quizzes are based on past exam-style questions to better prepare students for their final exams
3. **Detailed Solutions**: Provides thorough explanations for answers to help students understand the concepts and improve their problem-solving skills
4. **Notes and Marking Schemes**: Includes notes and marking schemes to teach students how to structure their answers effectively for maximum marks
5. **User-Friendly Interface**: An intuitive design ensures ease of navigation and accessibility for students of all levels

## File Structure

Here is an overview of the files included in this project and their respective functionalities

- **node\_modules/**: Contains all the dependencies and packages used for the app
- **package.json**: Lists the project dependencies, scripts, and metadata
- **prisma/**: Contains the database schema, though full integration with a database is planned for future updates
- **public/**: Static assets such as icons and images, including globe.svg, window\.svg, and favicon.ico
- **src/**: Main source folder containing application logic and components
  - **app/**: Includes route-specific files and folders like `quiz`, `quiz-generator`, and `signup` for core application functionalities
  - **components/**: Houses reusable UI components such as `button.tsx` and `quiz-form.tsx`
  - **lib/**: Utility functions and libraries such as `prisma.ts` for future database connections, `gpt.ts` for OpenAI integration, and `ReactQueryProvider.tsx`
  - **schemas/**: Includes schemas for validating or structuring data
  - **styles/**: Contains the global CSS file (`globals.css`) for the app's styling
- **tailwind.config.js**: Configuration file for Tailwind CSS
- **tsconfig.json**: TypeScript configuration file

## Design Choices

During the development of the Leaving Cert Revision App, several critical design choices were made

1. **Learning TypeScript**: This project served as an opportunity to learn and implement TypeScript, adding type safety and robustness to the codebase
2. **Next.js Framework**: Selected for its capability to handle server-side rendering, enhancing SEO and performance while simplifying routing and API development
3. **ShadCN for UI**: Used ShadCN to help create a cohesive and professional-looking UI, ensuring an aesthetically pleasing user experience
4. **Tailwind CSS**: Chosen for its flexibility and ease of use in creating responsive designs
5. **OpenAI Integration**: Used to dynamically generate high-quality and contextually relevant quiz questions, providing a unique learning experience
6. **Vercel for Hosting**: The app is hosted on Vercel, leveraging its seamless integration with Next.js and excellent performance

These decisions were informed by a focus on user needs, performance, scalability, and the opportunity to learn and implement new technologies effectively

## Challenges and Solutions

The development process included several challenges, which were addressed as follows

- **Dynamic Question Generation**: Ensuring questions were accurate and relevant was addressed by fine-tuning OpenAI prompts and training
- **Progress Tracking**: Implementing efficient data storage and retrieval required careful use of databases and optimized algorithms
- **User Experience**: Extensive testing and feedback helped refine the interface to ensure ease of use
- **Time Restraint**: Developing the application under a tight deadline meant prioritizing core features over advanced functionalities
- **Database Integration**: Due to limited time, a full database setup was not feasible, and data persistence is currently managed through local solutions
- **Authentication Setup**: Proper user authentication mechanisms are planned for future updates but were not implemented due to time constraints

## Future Improvements

While the Leaving Cert Revision App is fully functional and meets its initial goals, there are several areas for future enhancement

- **Expanded Subject Library**: Adding more niche subjects to cater to all Leaving Cert topics
- **Mobile App Integration**: Developing a dedicated mobile app for offline access and notifications
- **Community Features**: Introducing forums or group study functionalities to foster collaborative learning
- **Database and Authentication**: Establishing robust user authentication and transitioning to a scalable database system

## Conclusion

The Leaving Cert Revision App represents a significant step towards modernizing exam preparation for Irish students. Through this project, we have streamlined the study process and provided tools that make learning engaging and effective. It is our hope that this platform will empower students to achieve there academic goals with confidence

Thank you for exploring the Leaving Cert Revision App. For questions or feedback, please feel free to reach out - email me at [doyle.d.gavin@gmail.com](mailto\:doyle.d.gavin@gmail.com)
