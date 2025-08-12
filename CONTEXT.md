## Context Button

You can add a context button to your application UI to provide users with additional information or actions based on the current page or state.

### Example (Pug Template)

Add this button to your Pug template (e.g., `views/layout.pug` or `views/index.pug`):

```pug
button(type="button" onclick="showContext()") Context
```

Add a script to handle the button action:

```html
<script>
function showContext() {
  alert('This is the context information for this page.');
}
</script>
```

You can customize the `showContext` function to display a modal, sidebar, or fetch dynamic context as needed.
