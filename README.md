# Chatbot API Gemini 🚀

Welcome to the **Chatbot API Gemini** project! This application is designed to interact with the **Gemini API** and generate content based on user input. Built with **Spring Boot**, it integrates a simple and interactive user interface using **Thymeleaf**, **Tailwind CSS**, and **JavaScript**. The app follows a **monolithic architecture**, where all components are bundled into a single service for simplicity and ease of maintenance.

## Table of Contents 📑

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Monolithic Architecture](#monolithic-architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Project Configuration](#project-configuration)
- [Execution Instructions](#execution-instructions)
- [License](#license)

## Overview 📝

This project aims to create a **chatbot** that connects to the **Gemini API** to generate responses. Users can interact with the bot via a simple web interface. The chatbot offers multiple functionalities, such as:

- **Normal conversation**
- **Summarizing text**
- **Spell check**
- **Generating YouTube titles**
- **Generating YouTube descriptions**

Users send their messages and receive replies generated by the Gemini API in real-time. 

## Technologies Used ⚙️

The project is built using the following technologies:

- **Backend:** Spring Boot (Java)
- **Frontend:** HTML, CSS (Tailwind), JavaScript
- **API Communication:** WebClient (for communication with the Gemini API)
- **Database:** Not applicable (no database required)
- **Build Tool:** Maven (for dependency management)

## Monolithic Architecture 🏛️

This application follows a **monolithic architecture**, meaning that all components (frontend, backend, API communication) reside in a single service. Here’s why this architecture was chosen:

- **Integrated Frontend & Backend:** The frontend and backend are tightly coupled within a single Spring Boot application. This reduces the complexity of managing multiple services.
- **Centralized Communication:** Communication with the Gemini API, message handling, and user interface updates are managed within the same application.
- **Simple Maintenance:** As everything is in one place, it’s easy to manage dependencies, troubleshoot, and scale the project when needed.

## Project Structure 🏗️

The project is organized into several key layers:

- **Controller:** Manages HTTP requests and directs them to the appropriate services.
- **Service:** Contains the core business logic, including communication with the Gemini API.
- **Model:** Represents data structures, such as the message model.
- **Config:** Contains the WebClient configuration for making API requests.

### Package Breakdown 📂

- `com.ia.chat.service`: Contains logic for interacting with the Gemini API.
- `com.ia.chat.model`: Contains data models (e.g., `MsgModel`, `Content`).
- `com.ia.chat.controllers`: Includes REST controllers and static page rendering.
- `com.ia.chat.config`: Manages WebClient configurations.

## API Endpoints 🔌

The chatbot exposes a simple **REST API** to handle user interactions.

### `POST /api/chat/msg`

- **Description:** Sends a message to the Gemini API and returns the generated response.
- **Request:** Accepts a JSON object containing the message model (`MsgModel`).
- **Response:** Returns a response generated by the Gemini API.

Example of a **request**:

```json
{
  "message": "Hello, Chatbot! Can you summarize this text?"
}
```

## Project Configuration ⚙️

### Dependencies

The primary dependencies for the project are specified in the `pom.xml` file:

- `spring-boot-starter-web`: For building RESTful APIs.
- `spring-boot-starter-webflux`: For reactive communication (WebClient).
- `spring-boot-starter-thymeleaf`: For rendering dynamic HTML views.
- `spring-boot-devtools`: For automatic reloading during development.

### WebClient Configuration

To interact with the Gemini API, the `WebClient` is configured as follows:

```java
@Bean
public WebClient webClient() {
    return WebClient.builder().build();
}
```

### Making API Calls

In the `ChatService` class, a POST request is made to the Gemini API using the `WebClient`. Here’s how it's done:

```java
public String sendToApi(MsgModel msgModel) {
    try {
        return webClient.post()
                .uri(API_URL)
                .header("Content-Type", "application/json")
                .bodyValue(msgModel)
                .retrieve()
                .bodyToMono(String.class)
                .block();  
    } catch (WebClientResponseException e) {
        return "Error to send message: " + e.getResponseBodyAsString();
    }
}
```

### Important Configuration: API Key 🔑

Before running the application, make sure to replace `"YOU-KEY"` with your **Gemini API key**. This key is required to authenticate and interact with the Gemini API.

```java
// In ChatService.java, replace "YOU-KEY" with your actual Gemini API key
private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOU-KEY";
```

## Execution Instructions 🚀

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Otavig/chat-ia-gemini.git
cd chat-ia-gemini
```

### 2. Configure the Project

- Open `ChatService.java`.
- Replace `"YOU-KEY"` with your **Gemini API key** (get it from your Gemini account).

### 3. Ensure Java 17 is Installed

Make sure you have **Java 17** installed and properly configured in your environment. You can check your Java version by running:

```bash
java -version
```

### 4. Run the Application

To start the application, execute the following Maven command:

```bash
mvn spring-boot:run
```

This will run the Spring Boot application, and you can access the chatbot through your browser at `http://localhost:8080`.

## License 📝

This project is licensed under the [MIT License](LICENSE).

---

That's it! You now have a fully functional **Chatbot API Gemini** application. If you have any questions or need further assistance, feel free to open an issue or contact me directly.

Happy chatting! 😄
