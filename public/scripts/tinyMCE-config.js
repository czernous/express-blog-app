tinymce.init({
  selector: 'textarea#tiny-mce',
  height: 500,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap print preview anchor codesample',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ],
  toolbar:
    'undo redo | formatselect | ' +
    'bold italic backcolor | codesample | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',

  codesample_languages: [
    { text: 'HTML/XML', value: 'markup' },
    { text: 'HTML', value: 'html' },
    { text: 'CSS', value: 'css' },
    { text: 'SCSS', value: 'scss' },
    { text: 'SASS', value: 'sass' },
    { text: 'Javascript', value: 'javascript' },
    { text: 'jsx', value: 'jsx' },
    { text: 'TypeScript', value: 'typescript' },
    { text: 'tsx', value: 'tsx' },
    { text: 'Java', value: 'java' },
    { text: 'C#', value: 'csharp' },
    { text: 'ASP.Net', value: 'aspnet' },
    { text: 'GO', value: 'go' },
    { text: 'Python', value: 'python' },
    { text: 'Django', value: 'django' },
    { text: 'Dart', value: 'dart' },
    { text: 'PHP', value: 'php' },
    { text: 'Scala', value: 'scala' },
    { text: 'Swift', value: 'swift' },
    { text: 'Kotlin', value: 'kotlin' },
    { text: 'Objective-C', value: 'objectivec' },
    { text: 'Rust', value: 'rust' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'R', value: 'r' },
    { text: 'Reason', value: 'reason' },
    { text: 'F#', value: 'fsharp' },
    { text: 'C', value: 'c' },
    { text: 'C-like', value: 'clike' },
    { text: 'C++', value: 'cpp' },
    { text: 'CoffeeScript', value: 'coffeescript' },
    { text: 'Elixir', value: 'elixir' },
    { text: 'Elm', value: 'elm' },
    { text: 'Erlang', value: 'erlang' },
    { text: 'mathml', value: 'mathml' },
    { text: 'Markdown', value: 'markdown' },
    { text: 'EJS', value: 'ejs' },
    { text: 'haml', value: 'haml' },
    { text: 'Handlebars', value: 'handlebars' },
    { text: 'Liquid', value: 'liquid' },
    { text: 'Pug', value: 'pug' },
    { text: 'Twig', value: 'twig' },
    { text: 'JSON', value: 'json' },
    { text: 'JSONP', value: 'jsonp' },
    { text: 'SVG', value: 'svg' },
    { text: 'XML', value: 'xml' },
    { text: 'Docker', value: 'docker' },
    { text: 'YAML', value: 'yaml' },
    { text: 'GraphQL', value: 'graphql' },
    { text: 'MongoDB', value: 'mongodb' },
    { text: 'apacheconf', value: 'apacheconf' },
    { text: 'nginx', value: 'nginx' },
    { text: 'SQL', value: 'sql' },
    { text: 'Bash', value: 'bash' },
    { text: 'git', value: 'git' },
    { text: 'Power Shell', value: 'powershell' },
    { text: 'Bison', value: 'bison' },
    { text: 'Basic', value: 'basic' },
    { text: 'Clojure', value: 'clojure' },
    { text: 'groovy', value: 'groovy' },
    { text: 'Haskell', value: 'haskell' },
    { text: 'Haxe', value: 'haxe' },
    { text: 'Lisp', value: 'lisp' },
    { text: 'Matlab', value: 'matlab' },
    { text: 'Lua', value: 'lua' },
    { text: 'nim', value: 'nim' },
    { text: 'nix', value: 'nix' },
    { text: 'ocaml', value: 'ocaml' },
    { text: 'pascal', value: 'pascal' },
    { text: 'perl', value: 'perl' },
    { text: 'Web Assembly', value: 'webassembly' },
    { text: 'http', value: 'http' },
    { text: 'ini', value: 'ini' },
    { text: 'asciidoc', value: 'asciidoc' },
    { text: 'prolog', value: 'prolog' },
    { text: 'puppet', value: 'puppet' },
    { text: 'wiki', value: 'wiki' },
  ],
  codesample_content_css: 'http://ourcodeworld.com/material/css/prism.css',
});
