FROM openjdk:17-oracle
WORKDIR /app
COPY . /app
RUN ./mvnw package -DskipTests
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]