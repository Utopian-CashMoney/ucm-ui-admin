pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '5'))
        withAWS(credentials: 'jenkins-credentials')
    }

    stages {
        stage('SonarQube analysis') {
            steps {
                script {
                    scannerHome = tool 'SonarQube Scanner 4.6'
                }
                // Run code quality check on code, find output on SonarQube app
                withSonarQubeEnv('SonarQube Scanner') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=ucm-admin-ui -Dsonar.sources=. -Dsonar.host.url=http://52.55.57.2:81 -Dsonar.login=75b0a4edafa1e19151b1e21e07f411e55af77e67"// -Dsonar.branch.name=" + env.BRANCH_NAME
                }
            }
        }
        
        stage('Build NodeJS') {
            steps {
                // Install NodeJS dependencies
                sh 'npm install'
                // Build NodeJS project
                sh 'npm run build'
            }
        }
        
        stage('Push to S3 Bucket') {
            steps {
                // Install community.aws ansible packages
                sh 'ansible-galaxy collection install community.aws --ignore-errors'
                // Push to S3 Bucket
                sh 'ansible-playbook playbooks/UploadPlaybook.yaml -e ENV=' + env.BRANCH_NAME
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
