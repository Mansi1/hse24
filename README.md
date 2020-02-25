# HSE job interview

How to run application 

-- spring --
1. after importing gradle project, run gradle `clean build` task (included the react app)
2. run `docker-compose up` command in the main directory to setup a new postgres database
4. add an local `application-local.yml` and add your own api key for
3. start spring application with `dev,local` profile  (VM options: `-Dspring.profiles.active=dev,local`)

-- react --
1. First run all spring application to generate the latest swagger client `yarn generate-client | npm run generate-client`
2. Start react dev app `yarn start | npm run start`, this will automatically start an proxy @ port 8080 to prevent cors

swagger json `http://localhost:8080/v2/api-docs`
swagger html `http://localhost:8080/swagger-ui.html`

TODO's
1. Exception handling if product or category does not exist
2. Add products directly to category
3. Form validation for creation and updating missing
4. Dockerfile missing (_windows 10 Home, no HyperV, no docker_)
