
import glob
from sys import argv
from svg.path import parse_path
from svg.path.path import Line, CubicBezier, Move, Close, QuadraticBezier
from xml.dom import minidom

if len(argv) == 1:
    folder     = "svg_assets"
    file_name  = "Asset "
    asset_name = "lib/assets/asset"
    var_name   = "asset"
else:
    folder     = argv[1]
    file_name  = argv[2]
    asset_name = argv[3]
    var_name   = argv[4]

nr_files = glob.glob(f'{folder}/*.svg')
print(nr_files)

for i in range(len(nr_files)):
    print("Retrieving:", f'{folder}/{file_name}{i+1}.svg')

    doc = minidom.parse(f'{folder}/{file_name}{i+1}.svg')
    path_strings = [path.getAttribute('d') for path in doc.getElementsByTagName('path')]
    doc.unlink()
   
    with open(f'{asset_name}{i+1}.js', 'w') as af:
        print("Writing:", f'{asset_name}{i+1}.js')
        for path_string in path_strings:
            path = parse_path(path_string)
            af.write(f"var {var_name}{i+1}=["+"")
            af.write("{cmd : "+'"Move",x:0,y:0},')
            for e in path:
                af.write("{cmd : "+"")
                x0 = round(e.end.real,6)
                x1 = round(e.end.imag,6)
                if isinstance(e, CubicBezier):
                    af.write(f'"{e.__class__.__name__}"'+",")
                    af.write(' c1x: ' + str(round(e.control1.real, 6))+",")
                    af.write(' c1y: ' + str(round(e.control1.imag, 6))+",")
                    af.write(' c2x: ' + str(round(e.control2.real, 6))+",")
                    af.write(' c2y: ' + str(round(e.control2.imag, 6))+",")
                    af.write(f" x:{x0}"+",")
                    af.write(f" y:{x1}"+",")
                if isinstance(e, Line):
                    af.write(f'"{e.__class__.__name__}"'+",")
                    af.write(f" x:{x0}"+",")
                    af.write(f" y:{x1}"+",")
                if isinstance(e, Move):
                    af.write(f'"{e.__class__.__name__}"'+",")
                    af.write(f" x:{x0}"+",")
                    af.write(f" y:{x1}"+",")
                if isinstance(e, Close):
                    af.write(f'"{e.__class__.__name__}"'+",")
                if isinstance(e, QuadraticBezier):
                    af.write(f'"Close"'+",")
                af.write("}"+",")
            af.write("]")

        