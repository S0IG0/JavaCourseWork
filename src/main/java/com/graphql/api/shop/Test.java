package com.graphql.api.shop;

import com.graphql.api.security.custom.models.User;
import com.graphql.api.security.custom.services.UserService;
import com.graphql.api.shop.models.*;
import com.graphql.api.shop.repositories.*;
import com.graphql.api.shop.services.CustomerService;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
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

    public Test(CategoryRepository categoryRepository, CustomerRepository customerRepository, OrderRepository orderRepository, ComputerComponentRepository computerComponentRepository, RelationOrdersToComputerComponentsRepository relationOrdersToComputerComponentsRepository, UserService userService, CustomerService customerService) {
        this.categoryRepository = categoryRepository;
        this.customerRepository = customerRepository;
        this.orderRepository = orderRepository;
        this.computerComponentRepository = computerComponentRepository;
        this.relationOrdersToComputerComponentsRepository = relationOrdersToComputerComponentsRepository;
        this.userService = userService;
        this.customerService = customerService;
    }

    @PostConstruct
    public void init() {
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

    private List<ComputerComponent> createDefaultComputerComponents() {
        List<Category> categories = createDefaultCategories();
        return computerComponentRepository.saveAll(new ArrayList<>() {{
            add(new ComputerComponent(
                    "intel core i9",
                    "The processor",
                    new BigDecimal("45000"),
                    "Intel",
                    categories
            ));
            add(new ComputerComponent(
                    "intel core i7",
                    "The processor",
                    new BigDecimal("35000"),
                    "Intel",
                    categories
            ));
            add(new ComputerComponent(
                    "Amd Ry-zen 9",
                    "The processor",
                    new BigDecimal("5000"),
                    "Amd",
                    categories
            ));

            add(new ComputerComponent(
                    "Laptop",
                    "The laptop",
                    new BigDecimal("55000"),
                    "Asus",
                    new ArrayList<>() {{
                        add(categories.get(0));
                    }}
            ));
        }});

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

