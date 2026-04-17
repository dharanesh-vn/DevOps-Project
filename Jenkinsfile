pipeline {
    agent any

    environment {
        DOCKER_USER = "roronoazoro1350"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/dharanesh-vn/DevOps-Project.git'
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

        stage('Install Sonar Scanner') {
            steps {
                sh '''
                if [ ! -d "sonar-scanner" ]; then
                  wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
                  unzip -q sonar-scanner-cli-5.0.1.3006-linux.zip
                  mv sonar-scanner-5.0.1.3006-linux sonar-scanner
                fi
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                    ./sonar-scanner/bin/sonar-scanner \
                    -Dsonar.projectKey=Ecommerce-Project \
                    -Dsonar.sources=backend/src,frontend/src \
                    -Dsonar.host.url=http://192.168.49.1:9000 \
                    -Dsonar.login=sqa_abf1611de9fa0baf8b579f1f1ca94eef685f71da
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Reset') {
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
                docker build --no-cache -t roronoazoro1350/backend:latest -f docker/backend.Dockerfile .
                docker build --no-cache -t roronoazoro1350/frontend:latest -f docker/frontend.Dockerfile .
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
