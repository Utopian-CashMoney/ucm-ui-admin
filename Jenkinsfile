pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {
        stage('Git Pull') {
            steps {
                // Get some code from a GitHub repository
                git branch: 'cloud-developer', url: 'https://github.com/Utopian-CashMoney/ucm-ui-admin.git'
            }
        }
        
        stage('SonarQube analysis') {
            steps {
                script {
                    scannerHome = tool 'SonarQube Scanner 4.6'
                }
                withSonarQubeEnv('SonarQube Scanner') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=dev-ucm-adminui -Dsonar.sources=. -Dsonar.host.url=http://ec2-52-55-57-2.compute-1.amazonaws.com:81 -Dsonar.login=4ff6332346478c38e87a3d2727087174e70b913a"
                }
            }
        }
        
        stage('Build NodeJS') {
            steps {
                // Install NodeJS dependencies
                sh 'npm install --force'
                // Build NodeJS project
                sh 'npm run build'
            }
        }
        
        stage('Push to S3 Bucket') {
            steps {
                withAWS(credentials: 'jenkins-credentials', region: 'us-east-1') {
                    // Install community.aws ansible packages
                    sh 'ansible-galaxy collection install community.aws'
                    // Push to S3 Bucket
                    sh 'ansible-playbook playbooks/UploadPlaybook.yaml -e ENV=dev'
                }
            }
        }
    }
}
