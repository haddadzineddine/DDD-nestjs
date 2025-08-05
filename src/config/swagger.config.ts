import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const swagger = (app: INestApplication) => {
    const config = new DocumentBuilder()
        .setTitle('Matchers TT API')
        .setDescription('API documentation for the Matchers TT application. This API provides endpoints for user management and other features.')
        .setVersion('1.0')
        .addTag('Users', 'User management endpoints')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth', // This name here is important for references
        )
        .addServer('http://localhost:3000', 'Development server')
        .addServer('https://api.matchers-tt.com', 'Production server')
        .build();
    
    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'Matchers TT API Documentation',
        customCss: '.swagger-ui .topbar { display: none }',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        ],
    });
}