package com.graphql.api.shop;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.shop.models.*;
import com.graphql.api.shop.repositories.*;
import com.graphql.api.shop.services.ComputerComponentService;
import com.graphql.api.shop.services.CustomerService;
import com.graphql.api.shop.services.ImageService;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class Test {
    private final CategoryRepository categoryRepository;
    private final CustomerRepository customerRepository;
    private final OrderRepository orderRepository;
    private final ComputerComponentRepository computerComponentRepository;
    private final RelationOrdersToComputerComponentsRepository relationOrdersToComputerComponentsRepository;
    private final UserService userService;
    private final CustomerService customerService;
    private final ImageService imageService;
    private final ComputerComponentService computerComponentService;

    public Test(CategoryRepository categoryRepository, CustomerRepository customerRepository, OrderRepository orderRepository, ComputerComponentRepository computerComponentRepository, RelationOrdersToComputerComponentsRepository relationOrdersToComputerComponentsRepository, UserService userService, CustomerService customerService, ImageService imageService, ComputerComponentService computerComponentService) {
        this.categoryRepository = categoryRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.computerComponentRepository = computerComponentRepository;
        this.relationOrdersToComputerComponentsRepository = relationOrdersToComputerComponentsRepository;
        this.userService = userService;
        this.customerService = customerService;
        this.imageService = imageService;
        this.computerComponentService = computerComponentService;
    }

    @PostConstruct
    public void init() throws IOException {
        Customer customer = createDefaultCustomer();
        List<ComputerComponent> computerComponents = createDefaultComputerComponents();
        List<RelationOrdersToComputerComponents> relationOrdersToComputerComponents = new ArrayList<>();

        Order order = orderRepository.save(new Order(
                customer
        ));

        for (ComputerComponent component :
                computerComponents) {
            relationOrdersToComputerComponents.add(
                    relationOrdersToComputerComponentsRepository.save(new RelationOrdersToComputerComponents(
                            order,
                            component
                    ))
            );
        }

        order.setRelationOrdersToComputerComponents(relationOrdersToComputerComponents);
        orderRepository.save(order);
        testCustomer();
    }

    private Customer createDefaultCustomer() {
        return customerRepository.save(new Customer(
                "55 Bridge land Ave, North York, ON M6A 1Y7, Канада",
                "88800553535",
                userService.saveUser(new User(
                        "customer username",
                        "customer firstname",
                        "customer lastname",
                        "customer@mail.ru ",
                        "password"
                ))
        ));
    }

    private List<ComputerComponent> createDefaultComputerComponents() throws IOException {
        List<Category> categories = createDefaultCategories();
        List<Image> images = createDefaultImages();

        List<ComputerComponent> computerComponents = new ArrayList<>();
        for (int i = 0; i < 12; i++) {
            int finalI = i;
            computerComponents.add(new ComputerComponent(
                    "Amd Ry-zen" + String.valueOf(i),
                    "The processor",
                    new BigDecimal("5000" + String.valueOf(i)),
                    "Amd",
                    categories,
                    images.get(i),
                    createDefaultImages()

            ));
        }

        return computerComponentService.saveAllComputerComponents(computerComponents);

    }

    private List<Category> createDefaultCategories() {
        Category laptopAndComputers = new Category(null, "laptop and computers");
        Category computerComponent = new Category(laptopAndComputers, "computer component");
        Category cpu = new Category(computerComponent, "cpu");
        return categoryRepository.saveAll(new ArrayList<>() {{
            add(laptopAndComputers);
            add(computerComponent);
            add(cpu);
        }});
    }

    private List<Image> createDefaultImages() throws IOException {
        final String path = "C:\\Users\\honor\\Pictures\\images\\";
        return imageService.saveAllImages(new ArrayList<>() {{
            add(new Image("image 1", Files.readAllBytes(new File(path + "1.jpg").toPath())));
            add(new Image("image 2", Files.readAllBytes(new File(path + "2.jpg").toPath())));
            add(new Image("image 3", Files.readAllBytes(new File(path + "3.jpg").toPath())));
            add(new Image("image 4", Files.readAllBytes(new File(path + "4.jpg").toPath())));
            add(new Image("image 5", Files.readAllBytes(new File(path + "5.jpg").toPath())));
            add(new Image("image 6", Files.readAllBytes(new File(path + "6.jpg").toPath())));
            add(new Image("image 7", Files.readAllBytes(new File(path + "7.jpg").toPath())));
            add(new Image("image 8", Files.readAllBytes(new File(path + "8.jpg").toPath())));
            add(new Image("image 9", Files.readAllBytes(new File(path + "9.jpg").toPath())));
            add(new Image("image 10", Files.readAllBytes(new File(path + "10.jpg").toPath())));
            add(new Image("image 11", Files.readAllBytes(new File(path + "11.jpg").toPath())));
            add(new Image("image 12", Files.readAllBytes(new File(path + "12.jpg").toPath())));
        }});
    }

    private void testCustomer() {
        Customer customer = customerService.saveCustomer(new Customer(
                "66 Bridge land Ave, North York, ON M6A 1Y7, Канада",
                "888005535351",
                userService.saveUser(new User(
                        "customer username1",
                        "customer firstname1",
                        "customer lastname1",
                        "customer1@mail.ru ",
                        "password1"
                ))
        ));

        Order order = customer.getOrder();
        System.out.printf("");
    }
}

