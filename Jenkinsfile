pipeline {
    agent {
        docker { 
            image "zombie/node-wd"
            args "--network=skynet"
        }
    }
    stages {
        stage('Build') {
            steps {
                --entrypoint=sh "npm install"
            }            
        }
        stage('Tests') {
            steps {
                sh "npm run test:ci"
            }
            post {
                always {
                    junit testDataPublishers:[[$class: 'AttachmentPublisher']], testResults: "tests_output/**/*.xml"
                }
            }
        }
    }
}
