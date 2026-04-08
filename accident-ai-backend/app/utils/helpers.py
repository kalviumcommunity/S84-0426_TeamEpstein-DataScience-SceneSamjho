def clean_string(input_str: str) -> str:
    if not isinstance(input_str, str):
        return input_str
    return input_str.lower().strip()
