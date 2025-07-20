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

        stage('Setup Environment File') {
            steps {
                echo "📁 Copying .env file to the React project root..."
                bat "copy \"${ENV_FILE_PATH}\" \"%WORKSPACE%\\.env\""
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                echo "🔨 Building React application for production..."
                bat 'npm run build'
            }
        }

        stage('Deploy Build Files') {
            steps {
                echo "🚀 Deploying React build files..."
                script {
                    def deployPath = "C:\\inetpub\\wwwroot\\gst-admin"
                    
                    // Clean and recreate deployment directory
                    bat """
                        if exist "${deployPath}" rmdir /s /q "${deployPath}"
                        mkdir "${deployPath}"
                    """
                    
                    // Copy build files
                    bat """
                        xcopy "%WORKSPACE%\\build\\*" "${deployPath}\\" /E /Y
                    """
                    
                    echo "✅ Build files copied to ${deployPath}"
                }
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning up workspace..."
            cleanWs()
        }
        
        success {
            echo "✅ GST Admin deployment completed successfully!"
        }
        
        failure {
            echo "❌ GST Admin deployment failed!"
        }
    }
}