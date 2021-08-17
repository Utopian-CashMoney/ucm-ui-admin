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
                    sh 'ansible-galaxy collection install community.aws'
                    sh 'ansible-playbook UserSitePlaybook.yaml'
                }
            }
        }
    }
}
