---
title: "How to Set Up Custom SSH Configurations for GitHub Projects"
description: "A step-by-step guide to managing multiple SSH keys for different GitHub projects using custom configurations."
date: 2026-01-09
tags: ["GitHub", "SSH", "DevOps", "Productivity"]
---

When working on multiple GitHub projects, managing SSH keys for each project can become cumbersome. To streamline this process, you can create custom SSH configurations. This guide will walk you through the steps to set up custom SSH configurations, allowing you to use different SSH keys for different GitHub projects.

![Custom SSH Configuration Flow](/images/posts/custom-ssh.svg)

## Why Use Custom SSH Configurations?

Using custom SSH configurations provides several benefits:

*   **Security:** Separate SSH keys for different projects enhance security.
*   **Convenience:** Easily manage multiple SSH identities without switching manually.
*   **Organization:** Keep your SSH configurations organized and avoid conflicts.

## Step-by-Step Guide to Setting Up Custom SSH Configurations

### Generate SSH Keys

First, generate SSH keys for your projects. Open your terminal and use the following commands to generate SSH keys. Replace `project-name` with appropriate names for your projects.

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/project-name-1
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/project-name-2
```

Follow the prompts to create the keys. You can skip setting a passphrase if you prefer, though it's recommended for additional security.

### Add SSH Keys to the SSH Agent

To manage your SSH keys, add them to the SSH agent. Start the SSH agent and add your keys:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/project-name-1
ssh-add ~/.ssh/project-name-2
```

### Add SSH Keys to GitHub

Next, add the public keys to your GitHub account. Copy the content of your public keys:

```bash
cat ~/.ssh/project-name-1.pub
cat ~/.ssh/project-name-2.pub
```

Log in to GitHub, go to **Settings > SSH and GPG keys**, and click **New SSH key**. Add your keys, giving them identifiable titles (e.g., "Project 1 Key", "Project 2 Key").

### Create SSH Config File

Now, create or edit your SSH config file to include custom configurations for your projects. Open the SSH config file in your text editor:

```bash
nano ~/.ssh/config
```

Add the following configuration to the file:

```ssh
# Project 1
Host project-name-1
  HostName github.com
  User git
  IdentityFile ~/.ssh/project-name-1

# Project 2
Host project-name-2
  HostName github.com
  User git
  IdentityFile ~/.ssh/project-name-2
```

> [!NOTE]
> Replace `project-name-1` and `project-name-2` with the aliases you want to use for your projects. The `HostName` should remain `github.com`.

### Update Your Git Repositories

Update the remote URLs of your Git repositories to use the custom hostnames defined in your SSH config. Navigate to your project directory and update the remote URL:

```bash
cd /path/to/project-1
git remote set-url origin git@project-name-1:username/repository.git
```

Repeat this step for each project, using the appropriate custom hostname.

### Test Your Configuration

Finally, test your configuration to ensure it works. Try checking the connection or cloning a repository using the custom hostname:

```bash
ssh -T git@project-name-1
# or
git clone git@project-name-1:username/repository.git
```

If everything is set up correctly, you should see a success message from GitHub or the repository should clone without any issues.

### Impact
Implementing this custom SSH configuration has streamlined my workflow significantly. I no longer struggle with permission errors when pushing to different accounts, and the separation of keys adds a layer of security that aligns with industry best practices.

### Lessons Learned
*   **Alias Clarity:** Naming your SSH host aliases clearly (e.g., `github-personal` vs `github-work`) saves a lot of confusion later.
*   **Config Precedence:** Understanding that the `~/.ssh/config` file is parsed top-down is crucial. Specific rules should come before general wildcard rules.

### Related Reading
*   [GitHub Documentation: Connecting to GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
*   [OpenSSH Config File Syntax](https://man.openbsd.org/ssh_config)

## Conclusion

By setting up custom SSH configurations, you can manage multiple SSH keys for different GitHub projects more efficiently. This approach not only enhances security but also makes your workflow more convenient and organized. With these steps, you’ll be able to seamlessly switch between projects and maintain a clean SSH configuration.

For more detailed information on SSH and GitHub, refer to the [GitHub documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).