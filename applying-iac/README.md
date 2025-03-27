<h1>
  <span class="headline">Intro to Infrastructure as Code</span>
  <span class="subhead">Applying IaC</span>
</h1>

**Learning objective:** By the end of this lesson, students will be able to configure a simple system using an infrastructure as code tool, demonstrating foundational skills in infrastructure automation.

## Applying IaC in an example

Now that we understand the basic workflow of IaC let's put our knowledge into practice with a simple hands-on example. We'll use Terraform to configure a basic web server infrastructure on AWS. Although we won't be able to actually provision the resources due to the lack of access to an AWS account, we'll go through the process of defining the infrastructure as code and understanding the workflow.

### 1. Install Terraform

To get started, install Terraform on your local machine if you haven't already done so.

#### macOS

Install Terraform using Homebrew in your terminal:

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
```

#### Windows with WSL and Ubuntu

Open your terminal and run the following commands to install Terraform:

```bash
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

### 2. Create a new directory and configuration files

Navigate to your <code class="filepath">lectures</code> directory:

```bash
cd ~/code/ga/lectures
```

Create a new directory for your Terraform project.

```bash
mkdir terraform-example
cd terraform-example
```

Inside your project directory, create a file named `main.tf`. This file will contain your infrastructure configuration using the HashiCorp Configuration Language (HCL):

```bash
touch main.tf
```

Open the directory in VS Code:

```bash
code .
```

Open the `main.tf` file in and add the following configuration:

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

In this configuration, we define an AWS provider, an EC2 instance for the web server, and a security group to allow inbound traffic on port 80 (HTTP).

### 3. Initialize terraform

Open a terminal in VS Code, navigate to your project directory, and run the following command to initialize your Terraform project - `terraform init`.

This command initializes the Terraform working directory, downloads the necessary provider plugins, and sets up the back end to store the state of your infrastructure.

### 4. Format and validate configuration

Before proceeding, it's a good practice to format and validate your configuration files. Run the following commands:

```bash
terraform fmt
terraform validate
```

The `terraform fmt` command formats your configuration files to ensure consistent indentation and style. The `terraform validate` command checks the syntax and structure of your configuration files to ensure they are valid.

### 5. Plan the infrastructure

Although we won't be able to apply the changes and provision the actual resources, it's still valuable to generate an execution plan. The execution plan allows us to preview the changes that Terraform would make to our infrastructure. Run the following command: `terraform plan`

Terraform will analyze your configuration files, compare them with the current state (which is empty since we haven't provisioned anything yet), and display a summary of the proposed changes. It will show you the resources that would be created, including the EC2 instance and security group. An example output might look like this:

```plaintext
Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_instance.web_server will be created
  + resource "aws_instance" "web_server" {
      + ami                                  = "ami-0c55b159cbfafe1f0"
      + arn                                  = (known after apply)
      + associate_public_ip_address          = (known after apply)
      + availability_zone                    = (known after apply)
      + cpu_core_count                       = (known after apply)
      + cpu_threads_per_core                 = (known after apply)
      + disable_api_stop                     = (known after apply)
      + disable_api_termination              = (known after apply)
      + ebs_optimized                        = (known after apply)
      + enable_primary_ipv6                  = (known after apply)
      + get_password_data                    = false
      + host_id                              = (known after apply)
      + host_resource_group_arn              = (known after apply)
      + iam_instance_profile                 = (known after apply)
      + id                                   = (known after apply)
      + instance_initiated_shutdown_behavior = (known after apply)
      + instance_lifecycle                   = (known after apply)
      + instance_state                       = (known after apply)
      + instance_type                        = "t2.micro"
      + ipv6_address_count                   = (known after apply)
      + ipv6_addresses                       = (known after apply)
      + key_name                             = (known after apply)
      + monitoring                           = (known after apply)
      + outpost_arn                          = (known after apply)
      + password_data                        = (known after apply)
      + placement_group                      = (known after apply)
      + placement_partition_number           = (known after apply)
      + primary_network_interface_id         = (known after apply)
      + private_dns                          = (known after apply)
      + private_ip                           = (known after apply)
      + public_dns                           = (known after apply)
      + public_ip                            = (known after apply)
      + secondary_private_ips                = (known after apply)
      + security_groups                      = (known after apply)
      + source_dest_check                    = true
      + spot_instance_request_id             = (known after apply)
      + subnet_id                            = (known after apply)
      + tags                                 = {
          + "Name" = "Web Server"
        }
      + tags_all                             = {
          + "Name" = "Web Server"
        }
      + tenancy                              = (known after apply)
      + user_data                            = (known after apply)
      + user_data_base64                     = (known after apply)
      + user_data_replace_on_change          = false
      + vpc_security_group_ids               = (known after apply)

      + capacity_reservation_specification (known after apply)

      + cpu_options (known after apply)

      + ebs_block_device (known after apply)

      + enclave_options (known after apply)

      + ephemeral_block_device (known after apply)

      + instance_market_options (known after apply)

      + maintenance_options (known after apply)

      + metadata_options (known after apply)

      + network_interface (known after apply)

      + private_dns_name_options (known after apply)

      + root_block_device (known after apply)
    }

  # aws_security_group.web_server_sg will be created
  + resource "aws_security_group" "web_server_sg" {
      + arn                    = (known after apply)
      + description            = "Managed by Terraform"
      + egress                 = (known after apply)
      + id                     = (known after apply)
      + ingress                = [
          + {
              + cidr_blocks      = [
                  + "0.0.0.0/0",
                ]
              + from_port        = 80
              + ipv6_cidr_blocks = []
              + prefix_list_ids  = []
              + protocol         = "tcp"
              + security_groups  = []
              + self             = false
              + to_port          = 80
                # (1 unchanged attribute hidden)
            },
        ]
      + name                   = (known after apply)
      + name_prefix            = "web-server-sg-"
      + owner_id               = (known after apply)
      + revoke_rules_on_delete = false
      + tags_all               = (known after apply)
      + vpc_id                 = (known after apply)
    }

Plan: 2 to add, 0 to change, 0 to destroy.

───────────────────────────────────────────────────────────────────────────────────────────────────

Note: You didn't use the -out option to save this plan, so Terraform can't 
guarantee to take exactly these actions if you run "terraform apply" now.
```

Take a moment to review the execution plan. Pay attention to the resource names, their configurations, and any additional details provided. This step helps you understand how your configuration translates into actual infrastructure components.

### 6. Understand the workflow

Since we can't apply the changes and provision the resources, let's take a step back and reflect on the workflow we've gone through:

- We started by installing Terraform and creating a new directory for our project.

- We defined our infrastructure as code using the HashiCorp Configuration Language (HCL) in the `main.tf` file.

- We initialized our Terraform project, which downloaded the necessary provider plugins and set up the back end.

- We formatted and validated our configuration files to ensure readability and catch any potential issues.

- We generated an execution plan to preview the changes that Terraform would make to our infrastructure.

This workflow represents the core steps of working with infrastructure as code. Even though we couldn't complete the actual provisioning step, understanding this workflow is crucial. It allows us to define, version control, and collaborate on our infrastructure using the same principles and practices we apply to our application code.

## Reflection

Congratulations on completing this lesson on infrastructure as code! You've gained valuable knowledge about the principles, tools, and workflows involved in managing infrastructure using code. Remember, the key takeaways are:

- Infrastructure as code allows us to define, provision, and manage our infrastructure using declarative configuration files.

- IaC brings the benefits of version control, collaboration, and automation to infrastructure management.

- Tools like Terraform provide a powerful and extensible platform for implementing IaC across various providers and services.

- The IaC workflow typically involves defining the infrastructure, initializing the project, planning and previewing changes, applying the changes, and managing the infrastructure over time.

As you continue your journey with infrastructure as code, keep exploring, experimenting, and applying these concepts to different scenarios. The more you practice, the more comfortable and proficient you'll become in managing infrastructure using code.
