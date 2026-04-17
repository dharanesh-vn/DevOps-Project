pipeline {
    agent any

    environment {
        DOCKER_USER = "roronoazoro1350"
        IMAGE_TAG = "latest"
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

        // 🔐 Docker Login Clean
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
                docker build --pull -t $DOCKER_USER/backend:$IMAGE_TAG -f docker/backend.Dockerfile .
                docker build --pull -t $DOCKER_USER/frontend:$IMAGE_TAG -f docker/frontend.Dockerfile .
                '''
            }
        }

        stage('Push Docker Images') {
            steps {
                sh '''
                docker push $DOCKER_USER/backend:$IMAGE_TAG
                docker push $DOCKER_USER/frontend:$IMAGE_TAG
                '''
            }
        }

        // 🔥 CRITICAL: UPDATE K8S MANIFESTS
        stage('Update Kubernetes Manifests') {
            steps {
                sh '''
                sed -i "s|image: .*backend:.*|image: $DOCKER_USER/backend:$IMAGE_TAG|" k8s/backend-deployment.yaml
                sed -i "s|image: .*frontend:.*|image: $DOCKER_USER/frontend:$IMAGE_TAG|" k8s/frontend-deployment.yaml
                '''
            }
        }

        // 🔥 CRITICAL: PUSH BACK TO GITHUB (TRIGGERS ARGOCD)
        stage('Push Manifest Changes') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'github-creds',
                    usernameVariable: 'GIT_USER',
                    passwordVariable: 'GIT_PASS'
                )]) {
                    sh '''
                    git config user.name "jenkins"
                    git config user.email "jenkins@example.com"

                    git add k8s/

                    git commit -m "Update images via Jenkins [CI]" || echo "No changes"

                    git push https://$GIT_USER:$GIT_PASS@github.com/dharanesh-vn/DevOps-Project.git main
                    '''
                }
            }
        }
    }
}
