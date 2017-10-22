# packblade

![](http://images6.fanpop.com/image/photos/34000000/Mariah-Wong-beyblade-34080439-500-375.jpg)

A generator to you create a Ansible Playbook to automate the installation of your apps and dotfiles.

Getting started
------------

Install packblade with npm:

```sh
working...
```

## How to generate my automated folder?

You need to paste your dotfiles into a folder called `dotfiles/` and use the commands below to choose 
which programs you want to add to the automation.

```console
$ packblade --help

    Usage:
      $ packblade                Get yours files/dotfiles in current path and generates a role with files
      $ packblade <appname>      Generates a role(with tasks to install) of the app
    Example:
      $ packblade
      $ packblade spotify
```

## How to use the generated/ packblade folder

```bash
./install [options] [roles...]
Supported options:
  -f/--force
  -h/--help
  -v/--verbose (repeat for more verbosity)
Other options (passed through to Ansible):
  --check
  --step
  --tags="role"
Supported roles:
  defaults
    Install defaults apps.
  docker
    Install docker and docker-compose.
  dotfiles
    Creates symlinks in $HOME to the dotfiles in this repo
  spotify
    Install spotify client
  telegram
    Install telegram client
```

### Apps availables

Work in progress...


### Install specific app

You can use the same role name

```bash
sudo ./install --tags="telegram"
```

License
-------

The code is available under the [MIT License](LICENSE.md).
