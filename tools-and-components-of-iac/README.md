<h1>
  <span class="headline">Intro to Infrastructure as Code</span>
  <span class="subhead">Tools and Components of IaC</span>
</h1>

**Learning objective:** By the end of this lesson, students will be able to identify key tools and components used in infrastructure as code, such as declarative languages and configuration files.

## Tools and components of IaC

In the world of IaC, we have a variety of powerful tools and building blocks at our disposal. Let's explore some of the key components that make IaC tick:

### Declarative languages

IaC heavily relies on declarative languages to define the desired state of infrastructure. Tools like [Terraform](https://www.terraform.io/) use a declarative language called [HashiCorp Configuration Language (HCL)](https://github.com/hashicorp/hcl?tab=readme-ov-file), while others like [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) use JSON or YAML.

These languages allow us to describe our infrastructure in a human-readable and machine-interpretable format. Think of declarative languages as a way to express your infrastructure requirements in a clear and concise manner.

Instead of specifying the step-by-step instructions to provision resources, you simply define the desired end state. It's like telling a robot to "build me a house with two bedrooms and a red roof" rather than giving it a detailed list of construction steps.

Here's a simple example of declarative code using Terraform's HCL:

```hcl
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "Web Server"
  }
}
```

In this example, we're declaring an AWS EC2 instance resource with specific attributes like the AMI ID, instance type, and tags. Terraform will take care of figuring out how to provision this resource based on the declarative definition.

### Configuration files

Infrastructure definitions are stored in configuration files, often with extensions like `.tf` (Terraform), `.yml` (YAML), or `.json` (JSON). These files serve as the blueprint for your infrastructure, specifying resources, their properties, and dependencies.

Configuration files are version-controlled, enabling collaboration and tracking changes over time. They act as a single source of truth for your infrastructure, ensuring that everyone on your team has a clear understanding of what's being provisioned and how it's configured.

Here's an example of a simple configuration file in YAML format:

```yaml
---
resources:
  - name: web_server
    type: aws_instance
    ami: ami-0c55b159cbfafe1f0
    instance_type: t2.micro
    tags:
      Name: Web Server
```

This configuration file defines the same AWS EC2 instance resource as the previous Terraform example, but using YAML syntax.

### Resource providers

IaC tools integrate with various resource providers, such as cloud platforms (AWS, Azure, Google Cloud), container orchestration systems (Kubernetes), and configuration management tools (Ansible, Chef, Puppet).

Resource providers expose Application Programming Interfaces (APIs) that allow IaC tools to interact with the underlying infrastructure and manage resources programmatically.

Think of resource providers as the bridge between your IaC tool and the actual infrastructure components. They abstract away the complexities of interacting with different platforms and provide a consistent way to define and manage resources across various environments.

For example, Terraform has a vast ecosystem of resource providers, including AWS, Azure, Google Cloud, and many others. These providers allow you to define resources specific to each platform using a common language and workflow.

### State management

IaC tools keep track of the current state of the infrastructure using state files. These files maintain a mapping between the defined configuration and the actual resources provisioned in the target environment.

State management ensures that IaC tools can determine what actions need to be taken to align the infrastructure with the desired configuration.

State files act as a source of truth for the current state of your infrastructure. They allow IaC tools to perform incremental updates, track resource dependencies, and handle resource drift (when the actual state of the infrastructure differs from the desired state).

Terraform, for example, stores the state of your infrastructure in a file named `terraform.tfstate`. This file contains a JSON representation of the provisioned resources and their attributes. Terraform uses this state file to determine the necessary actions (create, update, or delete) during subsequent runs.

### Modules

IaC tools often support modularization, allowing complex infrastructures to be broken down into reusable and shareable components called *modules*.

Modules encapsulate a set of related resources and configurations, promoting code reuse, maintainability, and organization.

Modules are like building blocks that you can use to construct your infrastructure. They provide a way to package and share common configurations, making it easier to manage and scale your infrastructure across different projects and teams.

For example, you can create a module that defines a standard web server configuration, including the EC2 instance, security group rules, and relevant dependencies. This module can then be reused across multiple projects or environments, ensuring consistency and reducing duplication.

## What the tools and components enable

These are just a few of the key tools and components that form the foundation of infrastructure as code. By leveraging these elements, we can define, provision, and manage our infrastructure in a consistent, repeatable, and automated manner.

As we continue our exploration of IaC, we'll dive into the workflow and see how these components work together to bring our infrastructure to life.

<div class="activity knowledge-check">
  <h2 class="title">What is the third planet from the sun?</h2>
  <span class="minutes">5 min</span>
</div>

Imagine you’ve defined your infrastructure declaratively, including:

- One web server.
- A database accessible only internally.
- A firewall allowing only HTTPS traffic.

But, later you notice:

- HTTP (port 80) traffic is open.
- An extra web server instance is running.

Given the scenario above, answer the following questions:

- What problems might this drift cause?
- How could infrastructure as code tools help identify and fix this drift?
