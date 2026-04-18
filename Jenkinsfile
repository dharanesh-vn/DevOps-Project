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

        // 🔥 WAIT FOR SONAR (CRITICAL FIX)
        stage('Wait for SonarQube') {
            steps {
                sh '''
                echo "Waiting for SonarQube to be ready..."
                until curl -s http://localhost:9000 | grep -q "UP"; do
                  sleep 5
                done
                echo "SonarQube is ready"
                '''
            }
        }

        // 🔍 SONAR ANALYSIS
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                        sh '''
                        ./sonar-scanner/bin/sonar-scanner \
                        -Dsonar.projectKey=Ecommerce-Project \
                        -Dsonar.sources=backend/src,frontend/src \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=$SONAR_TOKEN
                        '''
                    }
                }
            }
        }

        // ⏳ QUALITY GATE (FIXED TIMEOUT)
        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        // 🔐 CLEAN DOCKER LOGIN
        stage('Docker Clean') {
            steps {
                sh '''
                rm -f ~/.docker/config.json || true
                docker logout || true
                '''
            }
        }

        // 🔐 DOCKER LOGIN (SECURE)
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

        // 🐳 BUILD IMAGES
        stage('Build Docker Images') {
            steps {
                sh '''
                docker build --pull -t roronoazoro1350/backend:latest -f docker/backend.Dockerfile .
                docker build --pull -t roronoazoro1350/frontend:latest -f docker/frontend.Dockerfile .
                '''
            }
        }

        // 🚀 PUSH IMAGES
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
