---
template: true
title: web pages from templates
thumbnail: thumbnail.jpg
description: discover the joy of reusable HTML with templates
language: en
---

# Creating web pages from templates

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This will let you redact your pages in Handlebars (`.hbs`) rather than HTML. Handlebars can do everything HTML does so any valid HTML is also valid Handlebars. But it does more, one of the cool thing with Handlebars are the "partials" which lets you inject the content of `.hbs` file inside other `.hbs` file. Which mean you could write your navbar once and then inject it into all of your pages. This way you'll have only one file to modify if you want to tweak your navbar.

## What hardware is needed ? 💾 🔌

None.

## Software dependencies 🌈 📂

- Node.js and a few libraries which are listed in the package.json

## How to run ? 🚀

To install everything you just have to run the usual

```
npm install
```

and then launch the project in developement mode by using the following command

```
npm run dev
```

## How to modify ? 🔩 🔨

### How to make your own partials

To create a partial you just need to create a `.hbs` file inside the `/partials` folder. Be aware that creating a folder inside `/partials` will not work.

When you use a partial you can provide informations to customize it a little. To do this you'll need to prepare slots in which we'll be able to insert the custom data.
This will create a slot with the name "author" `{{author}}`. There is also a special tag to specify where the content-slot goes inside of your partial, it is unique so it doesn't need a name and is written `{{> @partial-block}}`.

### How to use partials

To use a partial you need insert it into your page, the notation changes if it's a partial with a content-slot or without.

```hbs
{{>card author="Mr Johnson"}}
```

This shows how to insert the `card.hbs` partial while giving it "Mr Johnson" for the slot named author.
<br><br>

```hbs
{{#>button author="Jane Doe"}}hay look at me I'm a button{{/button}}
```

This shows how to insert the `button.hbs` partial while giving it "Jane Doe" for the slot named author and "hay look at me I'm a button" for its content.
<br><br>

### How to create your own page

To create a page you just need to create a `.hbs` file inside the `/pages` folder. Be aware that creating a folder inside `/pages` will not work.

### How to navigate to another page

The project is continuously converting your `.hbs` files into `.html` as you work and output them in the `/dist` folder so if you want to point to the `about` pages you'll need to reference it as such in your links

```html
<a href="/dist/about.html">about</a>
```

## Additional resources 📄 📗

Here is the documentation of Handlebars in case you want to take advantage of more than just the partials.

https://handlebarsjs.com/guide/
