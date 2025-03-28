# AUTO_TEST

# Dependencies for cypress:
- Download and install nodejs latest version as cypress requires nodejs server 
- Download and install Visual Studio Code 
- Create Project folder(here AUTO_TEST) and open in Visual Studio Code
- Go to VS Code terminal and run command "npm init -y" to generate package.json file
- run "npm cypress install" to install latest cypress version
- run "npx cypress --version" to check correct version is installed
- run "npx cypress verify" to verify cypress installed properly
- run "npx cypress open" to open cypress test runner dashboard
- in cypress test runner select E2E testing and select desired browser to run tests
- select folder structure provided by cypress 
   The structure will be -
   - /cypress 
   - e2e                        # Test cases
   - fixtures                   # Test data
   - support  
     - commands.js       # Custom commands 
     - e2e.js

   - cypress.config.js    # Cypress configuration file (Environment variables can be added)
   - package-lock.json    # dependencies and project details
   - package.json         # dependencies and project details

  - screenshots and videos folders will be created when tests are running


# How to execute tests -> Once test cases are created
- run "npx cypress open" and select E2E testing and select desired browser to run tests
- select spec file to be run which will run tests from that file in browser UI
OR
- run "npx cypress run" to run in headless mode which displays in terminal

# Add project to Github Repository
- Navigate to your project directory in command line
- Initialize a new Git repository 
-> git init
- Add all files to Git 
-> git add .
- Commit the files with a meaningful message
-> git commit -m "Initial commit - Cypress project setup"
- Add remote repository
-> git remote add origin https://github.com/(your-github-username)/(your-repo-name)
- Verify remote URL
-> git remote -v
- Push the code to GitHub (default branch is 'main' or 'master')
-> git branch -M main  
- push to main branch
-> git push -u origin main


# Integration with cypress cloud
- run "npx cypress open"
- log in to cypress dashboard using Github or google account
- Copy projectid from dashboard and add it to cypress.config.js in e2e:{}
- check the confirmation checkbox and click "OK" button
- The run command with CYPRESS_RECORD_KEY will be displayed, run that command in terminal
- Tests will run and cypress cloud link will be available at the end of test runs, copy that link
- paste link in browser, which opens results in cypress cloud dashboard
- explore the results of passed and failed tests

# Integration with Gihub actions for automating CI
- Sign in to github account and add CYPRESS_RECORD_KEY in security tab > actions 
- generate Github token
- generate YAML file (cypress.yml) in root directory of git Repository and write script with jobs to automate the pipeline
- Add all the required commands for dependencies and script to access record key and Github token
- Commit the changes 