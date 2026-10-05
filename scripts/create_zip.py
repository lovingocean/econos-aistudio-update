import os
import zipfile
import sys

def make_zip(source_dir, output_filename):
    # Directories and files to ignore
    ignored_dirs = {
        'node_modules', 
        '.git', 
        'dist', 
        '.vite', 
        '.next', 
        '.cache', 
        'coverage',
        'build'
    }
    
    ignored_extensions = {
        '.pyc', 
        '.log', 
        '.tsbuildinfo'
    }

    print(f"Creating zip archive {output_filename} from {source_dir}...")
    
    file_count = 0
    with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Modify dirs in-place to skip ignored directories
            dirs[:] = [d for d in dirs if d not in ignored_dirs and not d.startswith('.')]
            
            for file in files:
                if file.endswith('.zip') or file.endswith('.tar.gz'):
                    continue
                if any(file.endswith(ext) for ext in ignored_extensions):
                    continue
                
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                
                zipf.write(full_path, rel_path)
                file_count += 1

    size_mb = os.path.getsize(output_filename) / (1024 * 1024)
    print(f"Successfully packaged {file_count} files into {output_filename} ({size_mb:.2f} MB)")

if __name__ == '__main__':
    # Save to both root and public directory for web download
    os.makedirs('public', exist_ok=True)
    make_zip('.', 'public/econos-project.zip')
    make_zip('.', 'econos-project.zip')
