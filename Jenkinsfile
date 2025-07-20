pipeline {
    agent any

    environment {
        ENV_FILE_PATH = "C:\\ProgramData\\Jenkins\\.jenkins\\jenkinsEnv\\GST\\gst-admin"
        NODE_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📦 Cloning GST Admin repository..."
                checkout scmGit(
                    branches: [[name: '*/main']], 
                    extensions: [], 
                    userRemoteConfigs: [[
                        credentialsId: 'Wasim-Jenkins-Credentials', 
                        url: 'https://github.com/GST-NARTEC/gst-admin.git'
                    ]]
                )
            }
        }

        stage('Setup Environment') {
            steps {
                echo "📁 Setting up environment file..."
                bat "copy \"${ENV_FILE_PATH}\" \"%WORKSPACE%\\.env\""
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                bat 'npm ci'
            }
        }

        stage('Delete Old Build') {
            steps {
                echo "🗑️ Deleting old build directory..."
                bat '''
                    if exist "dist" rmdir /s /q "dist"
                    if exist "build" rmdir /s /q "build"
                '''
            }
        }

        stage('Create New Build') {
            steps {
                echo "🔨 Creating new build..."
                bat 'npm run build'
            }
        }
    }

    post {
        success {
            echo "✅ GST Admin build completed successfully!"
        }
        
        failure {
            echo "❌ GST Admin build failed!"
        }
    }
}