# FluentUI-CSS
FluentUI-CSS is a small collection of css files simulate the fluent UI design theme.

## Motivation 
We are a small company specializing in Line of Business applications, primarily using ASP.Net Blazor. While searching for a replacement for the dotnet Blazor Web App template, we came across the "Fluent UI Blazor" project. We were very impressed with its look and feel as it aligns with the latest Microsoft products, which is very appealing to our customers. However, we quickly realized that we would need to modify our existing libraries to use the components of this library.

There were three reasons against this:

Firstly, we fear that Fluent UI Blazor might become “silverlighted.”
Secondly, we did not want to create dependencies on third-party libraries for our own libraries. On the other hand, we might want to use the Fluent UI Blazor library for new projects and integrate our own libraries.
Thirdly, we are concerned that if we need another third-party library, it might not match the look and feel of "Fluent UI Blazor".
## Goals
Style the Blazor components (Button, NavBar, InputCheckbox, InputDate, InputNumber, InputText, InputTextArea, InputSelect, InputRadio) and the underlying HTML elements so that they resemble the "Fluent UI Web Components" as closely as possible. The stylesheets should be usable in both Blazor and pure HTML projects.
### Why Fluent UI Web Components and not Fluent UI Blazor
It took some time to understand the relationships between Fast, Fluent UI, Fluent UI Blazor, Fluent web components, Fluent UI React, and all their versions.

In short, Fluent UI Blazor is based on Fluent UI 1, while Fluent UI web components v3.0.0-beta.68 are already based on Fluent UI 2. Between Fluent UI 1 and Fluent UI 2, not only do the controls look slightly different, but unfortunately, different design tokens are also used. TThe Fluent UI Blazor team is working on a version using Web Controls v3. Therefore, we have decided to use the Web Controls v3 look and design tokens. (except nav )
## Boundaries

* We only want to style the Blazor input controls and possibly the other HTML input elements, without creating additional controls. This means that only a small portion of the controls provided in Fluent UI Web Controls have been replicated.
* At the moment, we do not want to use JavaScript to create or style controls. This has a negative impact on some components like InputDate and InputNumber. But we believe they are good enough.
  
## How to use
### The simplest way
*  copy folder FluentUI2/FluentUI2-CSS-RazorClassLibrary/wwwroot/css to your project
*  link /fluentui2css/fluentui2css.css (this will import all other css files from this folder)
*  link /fluentui2css-default-app-theme.css (this will set the default Fluent ui2 theme)
##### how to change theme
* open https://www.fluentui2css.easybyte.at/
*  select Cutom theme
*  chage Key color value , Hue Torision Vibracy
*  copy the created html css selector and replace the html selector from  /fluentui2css-default-app-theme.css.

### With a Light Darkmode switch
todo
### Project structure
tod
### Additional info

[Fluent UI React Components](https://react.fluentui.dev/?path=/docs/concepts-introduction--docs)

[Fluent UI Blazor](https://www.fluentui-blazor.net/)

[Fluent UI Web Components](https://web-components.fluentui.dev/)

[Fluent UI2 CSS](https://www.fluentui2css.easybyte.at/)


## Demo and screenshots

Demo: [Fluent UI2 CSS](https://www.fluentui2css.easybyte.at/)

![image](https://github.com/user-attachments/assets/f9b90374-ac89-4978-80fe-3ef337001a67)
![image](https://github.com/user-attachments/assets/3d076021-3120-421e-b69e-2ef19855da40)
![image](https://github.com/user-attachments/assets/1aa4bbe0-c67d-45f5-8275-d400dcee994c)
![image](https://github.com/user-attachments/assets/845eb421-010d-4fcf-916a-bb07b8d3fbfb)


