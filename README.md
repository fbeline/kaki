![logo](https://cloud.githubusercontent.com/assets/5730881/14907747/65247360-0da3-11e6-9353-a6f6e4659ff4.png)

Search tool designed for developers

### Why??
- Designed to save your time
- Common tasks in fewer keystrokes
- Only search for what really matter
- Full optimized for developers
- Portable and easy to install (any machine with nodejs installed)
- Open source

![kaki grep example](https://cloud.githubusercontent.com/assets/5730881/15449471/01b88000-1f55-11e6-912b-c22270eff82e.png)

### Instalation
    npm install -g kaki

### Usage

    kaki [OPTION]... PATTERN [path]


##### Examples:

Search for text in files `-x or --text`

    kaki -x myFunction

Search for regex pattern in files

    kaki -x "/filter.*/"

Search for files that contains text in name `-w`

    kaki -w "index"

Search for regex pattern in files name

    kaki -w "/[A-Z]+.js/"

Search recursively `-R` for files of type `-t` .doc,.docx,.xls

    kaki -R -t .doc,.docx,.xls

Search for shell files [.sh .bash .csh .tcsh .ksh .zsh .fish] in current directory

    kaki --shell

Invert match `-v`: select non-matching files

    kaki -v [OPTIONS]... PATTERN [path]

Ignore case distinctions `-i`

    kaki -i [OPTIONS]... PATTERN [path]

Ignore directories `--ignore`

    kaki -R --ignore dist,target

### General options

     -h, --help             output usage information
     -V, --version          output the version number
     -i, --ignorecase       Ignore case distinctions
     -x, --text             find text or /regex/ in files
     -w, --word             force PATTERN to match only whole words or /regex/ (file name)
     -t, --extensions       filter by custom types ex: ".app,.jar,.exe"
     -R, --rec              search recursively
     -v, --invert-match     Invert match: select non-matching lines
     --ignore               Ignore directories from search

### Supported languages and related extensions

    --actionscript .as .mxml
    --ada          .ada .adb .ads
    --asm          .asm .s
    --asp          .asp
    --aspx         .master .ascx .asmx .aspx .svc
    --batch        .bat .cmd
    --cc           .c .h .xs
    --cfmx         .cfc .cfm .cfml
    --clojure      .clj
    --cmake        CMakeLists.txt; .cmake
    --coffeescript .coffee
    --cpp          .cpp .cc .cxx .m .hpp .hh .h .hxx
    --csharp       .cs
    --css          .css
    --dart         .dart
    --delphi       .pas .int .dfm .nfm .dof .dpk .dproj .groupproj .bdsgroup .bdsproj
    --elisp        .el
    --elixir       .ex .exs
    --erlang       .erl .hrl
    --fortran      .f .f77 .f90 .f95 .f03 .for .ftn .fpp
    --go           .go
    --groovy       .groovy .gtmpl .gpp .grunit .gradle
    --haskell      .hs .lhs
    --hh           .h
    --html         .htm .html
    --java         .java .properties
    --js           .js
    --json         .json
    --jsp          .jsp .jspx .jhtm .jhtml
    --less         .less
    --lisp         .lisp .lsp
    --lua          .lua
    --make         .mk; .mak; makefile; Makefile; GNUmakefile
    --matlab       .m
    --md           .mkd; .md
    --objc         .m .h
    --objcpp       .mm .h
    --ocaml        .ml .mli
    --parrot       .pir .pasm .pmc .ops .pod .pg .tg
    --perl         .pl .pm .pod .t .psgi
    --perltest     .t
    --php          .php .phpt .php3 .php4 .php5 .phtml
    --plone        .pt .cpt .metadata .cpy .py
    --pmc          .pmc
    --python       .py
    --rake         Rakefile
    --rr           .R
    --ruby         .rb .rhtml .rjs .rxml .erb .rake .spec
    --rust         .rs
    --sass         .sass .scss
    --scala        .scala
    --scheme       .scm .ss
    --shell        .sh .bash .csh .tcsh .ksh .zsh .fish
    --smalltalk    .st
    --sql          .sql .ctl
    --tcl          .tcl .itcl .itk
    --tex          .tex .cls .sty
    --textile      .textile
    --tt           .tt .tt2 .ttml
    --vb           .bas .cls .frm .ctl .vb .resx
    --verilog      .v .vh .sv
    --vhdl         .vhd .vhdl
    --vim          .vim
    --xml          .xml .dtd .xsl .xslt .ent
    --yaml         .yaml .yml

### Default ignored directories
    [".bzr", ".cdv", ".dep", ".dot", ".nib", ".plst", ".git", ".hg", ".pc", ".svn",
     "_MTN", "CSV", "RCS", "SCCS", "_darcs", "_sgbak", "utom4te.cache", "blib", "_build",
     "cover_db", "node_modules", "CMakeFiles", ".metadata", ".cabal-sandbox", ".idea"]

### Notes
- Kaki is strongly inspired in ack! project.
- Made with love :heart:


### License
MIT
