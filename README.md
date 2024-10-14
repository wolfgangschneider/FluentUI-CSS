# FluentUI-CSS
FluentUI-CSS is a small collection of css files simulate the fluent UI design theme.

## Motivation 
We are a small company specializing in Line of Business applications, primarily using ASP.Net Blazor. While searching for a replacement for the dotnet Blazor Web App template, we came across the Fluent UI Blazor project. We were very impressed with its look and feel as it aligns with the latest Microsoft products, which is very appealing to our customers. However, we quickly realized that we would need to modify our existing libraries to use the components of this library.

There were three reasons against this:

Firstly, we fear that Fluent UI Blazor might become “silverlighted.”
Secondly, we did not want to create dependencies on third-party libraries for our own libraries. On the other hand, we might want to use the Fluent UI Blazor library for new projects and integrate our own libraries.
Thirdly, we are concerned that if we need another third-party library, it might not match the look and feel of Fluent UI Blazor.
## Goals
...
## Boundaries
...
## How to use
### The simplest way
*  copy folder FluentUI2/FluentUI2-CSS-RazorClassLibrary/wwwroot/css to your project
*  link /fluentui2css/fluentui2css.css (this will import all other css files from this folder)
*  link /fluentui2css-default-app-theme.css (this will set the default Fluent ui2 theme)
##### how to change theme
* open https://www.fluentui2css.easybyte.at/
*  select Cutom theme
*  chage Key color value , Hue Torision Vibracy
*  copy the created html css selector and remove the html selector from  /fluentui2css-default-app-theme.css.
...
### With a Light Darkmode switch
...
## Project structure
...
## Demo ans screenshots

Demo: [https://black-bay-011039603.5.azurestaticapps.net](https://www.fluentui2css.easybyte.at/)


![image](https://github.com/user-attachments/assets/b30e6552-2ba8-4ef9-b9d8-4d29ce403fc6)

![image](https://github.com/user-attachments/assets/17ee5329-d885-4ce5-a068-e329ef7c2b12)

![image](https://github.com/user-attachments/assets/a98f47aa-3f14-41ac-9ed8-acee50caf4ea)

