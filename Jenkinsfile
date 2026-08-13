pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/kiranpotnuri2877/todolist-react-node-mysql.git'
        BRANCH   = 'main'
    }

    stages {
        stage('1. Checkout Source Code') {
            steps {
                echo "Checking out code..."
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('2. Build & Deploy with Docker Compose') {
            steps {
                echo "Deploying via Docker Compose..."
                sh 'docker rm -f sql-db node-backend react-frontend || true'
                sh 'docker compose down || docker-compose down || true'
                sh 'docker compose up --build -d || docker-compose up --build -d'
            }
        }

        stage('3. Health Check & Status') {
            steps {
                sh 'docker compose ps || docker-compose ps'
            }
        }
    }

    post {
        always {
            echo "Cleaning up unused Docker images..."
            sh 'docker image prune -f || true'
        }
    }
}
