pipeline {
    agent any

    environment {
        DOCKER_USER = "roronoazoro1350"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/dharanesh-vn/DevOps-Project.git'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm install'
                        }
                    }
                }
                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh './sonar-scanner/bin/sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        // 🔴 FIXED: CLEAN + LOGIN BEFORE BUILD
        stage('Docker Clean') {
            steps {
                sh '''
                rm -f ~/.docker/config.json || true
                docker logout || true
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                    echo $PASS | docker login -u $USER --password-stdin
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build --pull -t roronoazoro1350/backend:latest -f docker/backend.Dockerfile .
                docker build --pull -t roronoazoro1350/frontend:latest -f docker/frontend.Dockerfile .
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                docker push roronoazoro1350/backend:latest
                docker push roronoazoro1350/frontend:latest
                '''
            }
        }
    }
}
