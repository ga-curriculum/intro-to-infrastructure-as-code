<h1>
  <span class="headline">Infrastructure as Code</span>
  <span class="subhead">Applying IaC</span>
</h1>

**Learning objective:** By the end of this lesson, students will be able to configure a simple system using an infrastructure as code tool, demonstrating foundational skills in infrastructure automation.

## Applying IaC in an example

Now that we understand the basic workflow of IaC, let's put our knowledge into practice with a simple hands-on example. We'll use Terraform to configure a basic web server infrastructure on AWS. Although we won't be able to actually provision the resources due to the lack of access to an AWS account, we'll go through the process of defining the infrastructure as code and understanding the workflow.

1. **Install Terraform**

   To get started, make sure you have Terraform installed on your local machine. You can download the appropriate version for your operating system from the official [Terraform website](https://www.terraform.io/downloads.html).

2. **Create a new directory**

   Create a new directory for your Terraform project. This will serve as your working directory where you'll store your configuration files.

   ``` bash
   mkdir terraform-example
   cd terraform-example
   ```

3. **Create configuration files**

   Inside your project directory, create a file named `main.tf`. This file will contain your infrastructure configuration using the HashiCorp Configuration Language (HCL).

   Open `main.tf` in your preferred text editor and add the following configuration:

   ```hcl
   # Define the provider (AWS)
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

   # Define the security group for the web server
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

   In this configuration, we define an AWS provider, an EC2 instance for the web server, and a security group to allow inbound traffic on port 80 (HTTP).

4. **Initialize terraform**

   Open a terminal in VS Code, navigate to your project directory, and run the following command to initialize your Terraform project - `terraform init`.

   This command initializes the Terraform working directory, downloads the necessary provider plugins, and sets up the backend for storing the state of your infrastructure.

5. **Format and validate configuration**

   Before proceeding, it's a good practice to format and validate your configuration files. Run the following commands:

   ```bash
   terraform fmt
   terraform validate
   ```

6. **Plan the infrastructure**

   Although we won't be able to apply the changes and provision the actual resources, it's still valuable to generate an execution plan. The execution plan allows us to preview the changes that Terraform would make to our infrastructure. Run the following command: `terraform plan`

   Terraform will analyze your configuration files, compare them with the current state (which is empty since we haven't provisioned anything yet), and display a summary of the proposed changes. It will show you the resources that would be created, including the EC2 instance and security group.

   Take a moment to review the execution plan. Pay attention to the resource names, their configurations, and any additional details provided. This step helps you understand how your configuration translates into actual infrastructure components.

7. **Understand the workflow**

   Since we can't apply the changes and provision the resources, let's take a step back and reflect on the workflow we've gone through:

   - We started by installing Terraform and creating a new directory for our project.

   - We defined our infrastructure as code using the HashiCorp Configuration Language (HCL) in the `main.tf` file.

   - We initialized our Terraform project, which downloaded the necessary provider plugins and set up the backend.

   - We formatted and validated our configuration files to ensure readability and catch any potential issues.

   - We generated an execution plan to preview the changes that Terraform would make to our infrastructure.

   This workflow represents the core steps of working with infrastructure as code. Even though we couldn't complete the actual provisioning step, understanding this workflow is crucial. It allows us to define, version control, and collaborate on our infrastructure using the same principles and practices we apply to our application code.

Congratulations on completing this lesson on infrastructure as code! You've gained valuable knowledge about the principles, tools, and workflows involved in managing infrastructure using code. Remember, the key takeaways are:

- Infrastructure as code allows us to define, provision, and manage our infrastructure using declarative configuration files.

- IaC brings the benefits of version control, collaboration, and automation to infrastructure management.

- Tools like Terraform provide a powerful and extensible platform for implementing IaC across various providers and services.

- The IaC workflow typically involves defining the infrastructure, initializing the project, planning and previewing changes, applying the changes, and managing the infrastructure over time.

As you continue your journey with infrastructure as code, keep exploring, experimenting, and applying these concepts to different scenarios. The more you practice, the more comfortable and proficient you'll become in managing infrastructure using code.
