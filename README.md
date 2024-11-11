### Local Development
- clone the Git repository using  `git clone https://github.com/Pratiyushkumar/AnswerAI.git`.
- install pnpm if it does not exists in your system by command `npm install -g pnpm`.
- create a firstore project and register your APP and copy all the firebase configuration variable values into .env file. Follow the .env_example file.
- run the command `pnpm install`.
- then start the project using `pnpm dev`.

### Features Implemented
- signup and login flow using google OAuth and via email and password.
- Routing and protected routing
- filter courses
- search courses
- responsivness of the web app
- Error Handling
- loading states
- state managment


### Technical Decisions and Trade-offs

| Feature                       | Technical Decisions and Trade-offs                                               |
| ----------------------------- | -------------------------------------------------------------------------------- |
| Signup and Login (OAuth)      | Chose Google OAuth for seamless integration, may limit users without Google.     |
| Signup and Login (Email/Pwd)  | Used Firebase for authentication, balanced security with ease of setup.          |
|

### Known Limitations

| Feature                       | Known Limitations                                                              |
| ----------------------------- | ------------------------------------------------------------------------------ |
| Signup and Login (OAuth)      | Limited to users with Google accounts.                                         |
| Signup and Login (Email/Pwd)  | Dependency on Firebase limits server-side customizations.                       |

### Time Spent
I have spent 2 days for this project.
