import os

# Автоматически определяем путь к Рабочему столу текущего пользователя
desktop_path = os.path.join(os.path.expanduser('~'), 'Desktop')

# Папка "Emporio Shop" на Рабочем столе
TARGET_FOLDER = os.path.join(desktop_path, 'Emporio Shop')

# 1. ЧТО ИЩЕМ (старый мусорный блок, который нужно удалить)
old_block = """<!-- Ваш добавленный текст или скрипт -->

<script src="new-super-puper-script.js"></script>
<div class="my-custom-block">Привет, мир!</div>"""

# 2. НА ЧТО ЗАМЕНЯЕМ (твой правильный скрипт)
new_block = '<script src="editions.js"></script>'

print("====================================================")
print(f"ЗАПУСК ОЧИСТКИ И ОБНОВЛЕНИЯ В ПАПКЕ:\n{TARGET_FOLDER}")
print("====================================================\n")

if not os.path.exists(TARGET_FOLDER):
    print(f"[!] ОШИБКА: Папка 'Emporio Shop' не найдена на Рабочем столе!")
else:
    all_files = os.listdir(TARGET_FOLDER)
    files_changed = 0
    
    for filename in all_files:
        filename_lower = filename.lower()
        
        # Пропускаем исключения
        if filename_lower == 'index.html' or filename_lower.startswith('player'):
            continue
            
        if filename.endswith('.html') or filename.endswith('.htm') or filename.endswith('.txt'):
            file_path = os.path.join(TARGET_FOLDER, filename)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                # Если нашли старый блок — заменяем его на новый
                if old_block in content:
                    content = content.replace(old_block, new_block)
                    
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Файл успешно очищен и обновлен: {filename}")
                    files_changed += 1
                    
                # На случай, если старого блока нет, но надо просто добавить editions.js перед </body>
                elif '</body>' in content.lower() and new_block not in content:
                    target = '</body>' if '</body>' in content else '</BODY>'
                    content = content.replace(target, new_block + '\n' + target)
                    
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(content)
                    print(f"Добавлен editions.js в файл: {filename}")
                    files_changed += 1

            except Exception as e:
                print(f"Ошибка с файлом {filename}: {e}")

    print(f"\nРабота завершена. Всего обновлено файлов: {files_changed}")

print("\nНажмите Enter, чтобы закрыть окно...")
input()