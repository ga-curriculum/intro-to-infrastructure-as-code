<h1>
  <span class="headline">Intro to Infrastructure as Code</span>
  <span class="subhead">Understanding IaC Workflows</span>
</h1>

**Learning objective:** By the end of this lesson, students will be able to understand the basic workflow of using infrastructure as code to provision and manage IT resources.

## Understanding simple IaC workflows

Now that we've explored the tools and components of IaC let's dive into a typical workflow to see how it all comes together. Imagine you're a chef preparing a meal. Like how you follow a recipe, gather ingredients, and execute cooking steps, IaC follows a similar process to provision and manage infrastructure.

### 1. Define

The first step is to define your infrastructure requirements and desired state in code using a declarative language. This is like writing down your recipe, specifying the ingredients (resources) and instructions (configurations) needed to create your infrastructure. You'll craft configuration files describing your servers, networks, storage, and any other necessary components.

Let's consider an example where we want to provision a simple web application infrastructure. We'll define the following resources in our configuration file:

```hcl
# Define the provider (for example, AWS)
provider "aws" {
  region = "us-west-2"
}

# Define the web server instance
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "Web Server"
  }
}

# Define the security group for the webserver
resource "aws_security_group" "web_server_sg" {
  name_prefix = "web-server-sg-"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

In this example, we define an AWS provider, an EC2 instance for the web server, and a security group to control inbound traffic to the web server.

### 2. Initialize

Next, you'll initialize your IaC project by preparing the necessary tools and dependencies.

This step is like preparing your kitchen, ensuring all the utensils and equipment are ready. You'll install the IaC tool (for example, Terraform) and configure it to connect to your target environment (for example, AWS).

To initialize a Terraform project, you'll run the following command in your project directory: `terraform init`.

This command will download the necessary provider plugins and initialize the Terraform backend, which stores the state of your infrastructure.

### 3. Plan

Before actually making any changes, it's crucial to preview and validate your infrastructure changes. IaC tools provide a planning step where you can see a detailed execution plan of what will be created, updated, or destroyed based on your configuration. This is like reviewing your recipe and ensuring you have all the ingredients before cooking.

With Terraform, you can generate an execution plan by running the `terraform plan` command.

This command will compare your configuration files with the current state of your infrastructure (if any) and display a summary of the proposed changes. It will show you which resources will be created, modified, or destroyed and any associated costs.

### 4. Apply

Once you're confident with the plan, it's time to execute it and provision your infrastructure. The IaC tool will take your configuration files and communicate with the appropriate resource providers to create, update, or delete resources as defined.

This is like following the recipe step by step, combining ingredients, and cooking until your meal is ready.

To apply the changes and provision the infrastructure with Terraform, you'll run `terrraform apply`.

Terraform will prompt you to confirm the changes and then execute the plan. It will communicate with the AWS API to create the EC2 instance, security group, and any other defined resources.

### 5. Manage

After provisioning your infrastructure, IaC tools help you manage and maintain it over time. You can update your configuration files to modify resources, scale up or down, or apply security patches. IaC tools will determine the necessary actions to align your infrastructure with the updated configuration. This is like adjusting the seasoning or ingredients in your recipe to perfect the flavor.

For example, if you want to update the instance type of your web server, you can modify the instance_type parameter in your configuration file:

```hcl
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.small"  # Updated from t2.micro
  # ...
}
```

After making the change, you'll run `terraform apply` again. Terraform will compare the updated configuration with the current state and determine that the EC2 instance needs to be modified. It will handle the necessary updates seamlessly.

### 6. Destroy

When you no longer need certain resources or want to clean up your environment, IaC tools allow you to destroy infrastructure in a controlled manner. By specifying the resources to be destroyed in your configuration files, you can easily tear down components that are no longer required. This is like cleaning up your kitchen after the meal is done.

To destroy the provisioned infrastructure with Terraform, you'll run `terraform destroy`.

Terraform will prompt you for confirmation and then destroy the resources defined in your configuration files, such as the EC2 instance and security group.

## Why follow this workflow?

By following this workflow, you can automate the provisioning and management of your infrastructure, ensuring consistency, repeatability, and efficiency. IaC allows you to treat your infrastructure as code, enabling version control, collaboration, and the ability to deploy and scale your applications rapidly.

As we move forward, let's explore a hands-on example to reinforce these concepts and see IaC in action.
