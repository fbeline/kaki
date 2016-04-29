![logo](https://cloud.githubusercontent.com/assets/5730881/14907747/65247360-0da3-11e6-9353-a6f6e4659ff4.png)
The command line search tool that **nobody asked for**

### Why??
- Designed to save your time
- Common tasks in fewer keystrokes
- Portable and easy to install (any machine with nodejs installed)
- Open source

### Instalation
    npm install -g kaki

### Usage

	kaki [params] [path]


##### stupid examples:

Search for shell files [.sh .bash .csh .tcsh .ksh .zsh .fish] in current directory

	kaki --shell
Search recursively `-R` for files files of type `-t` [.doc,.docx,.xls].

	kaki -R -t ".doc,.docx,.xls"


Apply following Regex only in javascript files

	kaki --js -w "[A-Z].*"

Search whole word `package`

    kaki -w package

Search for exact characters sequence

	kaki -Q main.h

Invert match `-v`: select non-matching files

	kaki -vw index

Ignore case distinctions `-i`

	kaki -iw ScRipT.bash

### General options

	 -h, --help                   output usage information
	 -V, --version                output the version number
     -i, --ignorecase			  Ignore case distinctions
	 -t, --extensions             filter by custom types ex: ".app,.jar,.exe"
	 -R, --rec                 	  search recursively
	 -v, --invert-match           Invert match: select non-matching lines
	 -w, --word                   Force PATTERN to match only whole words
	 -Q, --literal                Quote all metacharacters

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


## The MIT License
> Copyright (c) 2015 Felipe Baravieira

> Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

> The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.