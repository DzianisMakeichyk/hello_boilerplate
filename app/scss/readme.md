## Syntax & formatting


Use 2 space indent, with maximum of 80 characters per line.
To avoid any potential issue with character encoding, it is highly recommended to force UTF-8 encoding in the main stylesheet using the @charset directive. Make sure it is the very first element of the stylesheet and there is no character of any kind before it.
    
    @charset 'utf-8';
    
##### Leading Zeros

Numbers should display leading zeros before a decimal value less than one. Never display trailing zeros.

##### Calculations

Top-level numeric calculations should always be wrapped in parentheses. Not only does this requirement dramatically improve readability, it also prevents some edge cases by forcing Sass to evaluate the contents of the parentheses.

    .example {
        width: (100% / 3);
    }
    
## Naming convention

Regarding variables, functions and mixins, we stick to something very CSS-y: lowercase hyphen-delimited, and above all meaningful. If You naking classes we stick to mixed OOCSS & ACSS

    $vertical-rhythm-baseline: 1.5rem;
    
    @mixin size($width, $height: $width) {
      // …
    }
    
    @function opposite-direction($direction) {
      // …
    }
    
Use prefixes for utility classes and classes describing states like:
is-loading, is-active --> For States
u-text-center, u-text-left --> For Helpers and Ulitity Classes

Do not afraid to use !important for Utility Classes but ony for them,
You can read more about this here:
http://csswizardry.com/2016/05/the-importance-of-important/
    
## Commenting

As simple as CSS can get, there is still a lot of room for comments. These could be explaining:

- the structure and/or role of a file;
- the goal of a ruleset;
- the idea behind a magic number;
- the reason for a CSS declaration;
- the order of CSS declarations;
- the thought process behind a way of doing things.

Every variable, function, mixin and placeholder that is intended to be reused all over the codebase should be documented
Ideally, any CSS ruleset should be preceded by a C-style comment explaining the point of the CSS block. This comment also hosts numbered explanations regarding specific parts of the ruleset. For instance:

    /**
     * Helper class to truncate and add ellipsis to a string too long for it to fit
     * on a single line.
     * 1. Prevent content from wrapping, forcing it on a single line.
     * 2. Add ellipsis at the end of the line.
     */
    .ellipsis {
      white-space: nowrap; /* 1 */
      text-overflow: ellipsis; /* 2 */
      overflow: hidden;
    }

## Architecture

We`re using The 7-1 pattern with one additional structure for browser support, example folder structure should ideally looks like this:

    scss/
    |
    |– abstracts/
    |   |– _variables.scss    # Sass Variables
    |   |– _functions.scss    # Sass Functions
    |   |– _mixins.scss       # Sass Mixins
    |   |– _placeholders.scss # Sass Placeholders
    |
    |– base/
    |   |– _typography.scss   # Typography rules
    |   …                    # Etc.
    |
    |– browsers/
    |   |– _ie.scss           # Internet Explorer Specific Styles
    |   |– _ff.scss           # Firefox Specific Styles
    |   …                     # Etc.
    |
    |– components/
    |   |– _buttons.scss      # Buttons
    |   |– _carousel.scss     # Carousel
    |   |– _cover.scss        # Cover
    |   |– _dropdown.scss     # Dropdown
    |   …                     # Etc.
    |
    |– layout/
    |   |– _navigation.scss   # Navigation
    |   |– _grid.scss         # Grid system
    |   |– _header.scss       # Header
    |   |– _footer.scss       # Footer
    |   |– _sidebar.scss      # Sidebar
    |   |– _forms.scss        # Forms
    |   …                     # Etc.
    |
    |– pages/
    |   |– _home.scss         # Home specific styles
    |   |– _contact.scss      # Contact specific styles
    |   …                     # Etc.
    |
    |– themes/
    |   |– _theme.scss        # Default theme
    |   |– _admin.scss        # Admin theme
    |   …                     # Etc.
    |
    |– vendors/
    |   |– _bootstrap.scss    # Bootstrap
    |   |– _jquery-ui.scss    # jQuery UI
    |   |– _reset.scss        # Reset/normalize
    |   …                     # Etc.
    |
    `– main.scss              # Main Sass file
