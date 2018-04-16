# Themeans

WordPress boilerplate theme by Collectively

## Getting Started

This boilerplate package includes the entire Roots ecosystem - Trellis, Bedrock, Sage 9 - with lots of nifty preconfigurations and addons. 

### Installing

To install Themeans, clone the entire repo into your development directory, ie: `/themeans.test`
```
git clone --depth=1 git@github.com:Collectively-LLC/themeans.git
```

Update your site hosts in `/trellis/group_vars/development/wordpress_sites.yml and /trellis/group_vars/development/vault.yml`

Update your `publicPath` and `devUrl` in `/site/web/app/themes/themeans/resources/assets/config.json`

Change your theme details (title, author, etc.) in `/site/web/app/themes/themeans/resources/style.css`

Spin up your local dev VM by running `vagrant up` from the `/trellis` folder

To initialize your theme, navigate to your theme's directory (`/site/web/app/themes/themeans`) and run `yarn && yarn build`

You can then activate BrowserSync from the theme directory using `yarn run start`

