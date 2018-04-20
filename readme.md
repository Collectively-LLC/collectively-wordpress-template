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

### Development

Themeans is a custom variant of Sage, and, as such, there are certain organizational methods which are atypical to a traditional WordPress theme. This may feel like chaos, but it's for the best. 😅

#### Components

- Theme: `site/web/app/themes/themeans`
- Most of your front-end development will happen in  `site/web/app/themes/themeans/resources`
  - template files / Ƭ̵̬̊ "root" : `site/web/app/themes/themeans/views` - index., page., search., single., etc. template files, as would typically be found in the root of a WordPress theme folder
  - partial layouts : `site/web/app/themes/views/themeans/views/partials` - layout components, ie: header, footer, sidebar, comments
  - theme assets : `site/web/app/themes/views/themeans/assets` - contains folders for `images`, `styles`, `scripts`, etc.
- Composer Plugins json: `site/composer.json` - contains a standard set of plugins that are applicable to most WordPress sites
  - can be modified to add additional plugins
  - removal of existing plugins is not recommended, though they can be deactivated via the wp-admin
- MU-Plugin: `site/web/app/mu-plugins/themeans-functions`
  - Themeans global helper functions, Meta boxes, and Options pages
  - *Don't touch pls*
- Custom MU-Plugin: `site/web/app/mu-plugins/your-site-name`
  - your site-specific CPTs, Meta configurations, Options pages, filters, and anything surrounding data will live here
  - a few prebuilt functions are included by default to help get you started; some of these may work for you out of the box, others will require fitting to your theme and use, and few may be unnecessary to your theme entirely - modify this entirely to fit your needs

##### Why an MU-Plugin? Why *TWO* MU-Plugins?

Keeping data-handling functionality independent of the theme itself will help to mitigate the effects on the site content in the event of theme replacement or disruption. For example, if a site were to fall-back to the WordPress Twentyseventeen Theme, or the client were to want a new WordPress theme entirely, the existing data architecture and access points, and thus, any content depending on it, would be preserved.

It is possible that functions developed in your custom mu-plugin are not dependent on the Themeans-functions mu-plugin or on other libraries, but it is perfectly acceptible if they are.

The Themeans-functions mu-plugin itself is dependant on external plugins. When using the full Themeans environment, plugins are installed via the composer.json file. In any case, you will receive alerts in the wp-admin if any required components are not located / active.

### Using Sage 9

#### Passing Data from Custom Plugin to the Theme

If you're developing functionality to generate information needed to be accessible in all areas of the site, you can use the Sage 9 global filter:
```
add_action('the_post', function() {
    sage('blade')->share('links', [
        'facebook' => 'https://facebook.com/rootswp',
        'twitter' => 'https://twitter.com/rootswp'
    ]);
});
```
From within any Blade template, use {{ $links['facebook'] }} and {{ $links['twitter'] }} to output the data.

If your data output is template- or page-specific, you can use:
```
add_filter('sage/template/page/data', function (array $data) {
    $data['header_image'] = get_field('header_image');
    $data['header_content'] = get_field('header_content');
    return $data;
});
```
In your Blade templates for pages, use {{ $header_image }} and {{ $header_content }} to output the data.

#### Referencing your front-end assets

`@asset('images/stella.jpg')` will expand to `http://example.dev/app/themes/sage/dist/images/stella_264f29a6.jpg`

#### Getting Blade templates via PHP
```
add_shortcode('reviews', function($atts) {
    return \App\template('partials.reviews');
});
```
