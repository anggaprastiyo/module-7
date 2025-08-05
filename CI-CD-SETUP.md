# CI/CD Pipeline Setup Guide

This guide explains how to set up the GitHub Actions workflow with SonarCloud integration for the Weather Checker Application.

## Overview

The CI/CD pipeline includes the following jobs:
- **Lint**: Code linting with ESLint and Prettier
- **Test**: Unit testing with Jest
- **Build**: TypeScript compilation and artifact upload
- **SonarCloud**: Code quality analysis and coverage reporting

## Prerequisites

1. **GitHub Repository**: Ensure your code is in a GitHub repository
2. **SonarCloud Account**: Create a SonarCloud account at https://sonarcloud.io
3. **GitHub Secrets**: Configure required secrets in your repository

## Setup Instructions

### 1. GitHub Secrets Configuration

Add the following secrets to your GitHub repository (Settings > Secrets and variables > Actions):

```
SONAR_TOKEN=your-sonarcloud-token
SONAR_HOST_URL=https://sonarcloud.io
```

To get your SonarCloud token:
1. Go to https://sonarcloud.io
2. Navigate to Account > Security
3. Generate a new token

### 2. SonarCloud Project Setup

1. **Create a new project in SonarCloud**:
   - Go to https://sonarcloud.io
   - Click "Create new project"
   - Choose "GitHub" as the provider
   - Select your repository

2. **Update the project key** in the following files:
   - `.github/workflows/ci-cd.yml` (line with `sonar.projectKey`)
   - `weather-report/sonar-project.properties` (line with `sonar.projectKey`)

   Replace `your-organization_weather-checker-app` with your actual project key.

3. **Update the organization** in the same files:
   - Replace `your-organization` with your actual SonarCloud organization key.

### 3. Quality Gate Configuration

In SonarCloud, configure your Quality Gate with the following conditions:

#### Required Conditions:
- **Coverage on New Code**: > 80%
- **Duplicated Lines on New Code**: < 3%
- **Maintainability Rating on New Code**: A
- **Reliability Rating on New Code**: A
- **Security Rating on New Code**: A
- **Security Hotspots Reviewed on New Code**: > 90%

#### Optional Conditions:
- **Bugs on New Code**: < 1
- **Code Smells on New Code**: < 5
- **Vulnerabilities on New Code**: < 1

### 4. Workflow Configuration

The workflow is configured to run on:
- Push to `main` and `develop` branches
- Pull requests to `main` and `develop` branches

## Workflow Jobs

### Lint Job
- Installs ESLint and Prettier
- Runs ESLint on TypeScript files
- Checks code formatting with Prettier
- Fails if linting errors are found

### Test Job
- Installs Jest and testing dependencies
- Runs unit tests
- Generates coverage reports
- Continues on error (for demonstration purposes)

### Build Job
- Compiles TypeScript to JavaScript
- Uploads build artifacts
- Stores artifacts for 7 days

### SonarCloud Job
- Depends on lint, test, and build jobs
- Runs tests with coverage
- Performs SonarCloud analysis
- Waits for Quality Gate results

## Local Development

### Running Tests Locally
```bash
cd weather-report
npm install
npm test
```

### Running Linting Locally
```bash
npm run lint
npm run lint:fix  # Auto-fix linting issues
```

### Running Formatting Locally
```bash
npm run format
npm run format:check
```

### Running with Coverage
```bash
npm run test:coverage
```

## Troubleshooting

### Common Issues

1. **SonarCloud Token Issues**:
   - Ensure the token has the correct permissions
   - Check that the token is correctly set in GitHub secrets

2. **Build Failures**:
   - Check TypeScript compilation errors
   - Ensure all dependencies are installed

3. **Test Failures**:
   - Review test output for specific failures
   - Check that test files are in the correct location

4. **Quality Gate Failures**:
   - Review SonarCloud analysis results
   - Address code quality issues
   - Check coverage thresholds

### Debugging Workflow

1. **View Workflow Logs**:
   - Go to Actions tab in GitHub
   - Click on the workflow run
   - Review job logs for specific errors

2. **Local Testing**:
   - Run the same commands locally that the workflow uses
   - This helps identify environment-specific issues

## Security Considerations

1. **Secrets Management**:
   - Never commit secrets to the repository
   - Use GitHub secrets for sensitive data
   - Rotate tokens regularly

2. **Code Quality**:
   - Address security vulnerabilities identified by SonarCloud
   - Follow security best practices
   - Regular security audits

## Maintenance

### Regular Tasks
1. **Update Dependencies**: Keep npm packages updated
2. **Review Quality Gate**: Monitor and adjust quality thresholds
3. **Update Workflow**: Keep GitHub Actions up to date
4. **Security Audits**: Regular security reviews

### Monitoring
- Monitor workflow execution times
- Track code quality metrics
- Review and address SonarCloud issues
- Monitor test coverage trends

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud Documentation](https://docs.sonarcloud.io)
- [ESLint Documentation](https://eslint.org/docs)
- [Jest Documentation](https://jestjs.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs) 